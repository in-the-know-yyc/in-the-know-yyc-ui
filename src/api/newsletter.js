import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import mailchimpClient from "@mailchimp/mailchimp_marketing";

//AWS constants
const aws_region = process.env.AWS_REGION || process.env.NEXT_PUBLIC_AWS_REGION
const aws_secretId = process.env.AWS_MAILCHIMP_SECRET_NAME || process.env.NEXT_PUBLIC_AWS_MAILCHIMP_SECRET_NAME;
const aws_access_key = process.env.AWS_ACCESS_KEY_ID || process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY || process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
const aws_versionStage = "AWSCURRENT"

//AWS constants
const mailchimp_server_prefix = process.env.MAILCHIMP_SERVER_PREFIX || process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX
const mailchimp_list_id = process.env.MAILCHIMP_LIST_ID || process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID

/**
 * Sends an email subscription request to Mailchimp.
 *
 * @param {string} email - The email address to subscribe.
 * @returns {Promise<Object>} - The result of the subscription request.
 */
export async function sendEmailSubscription(email){
  
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - -')
  console.log('- - - - - - - ENTRA EMAIL SUBSCRIPTION - - - - - - -')
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - -')

  //AWS Secrets Manager implementing
  const secretsManagerClient = new SecretsManagerClient({
      region: aws_region,
      credentials: {
          accessKeyId: aws_access_key,
          secretAccessKey: aws_secret_access_key
      }
  });
  console.log(secretsManagerClient)

  let secretsManagerResponse;

  try {
      secretsManagerResponse = await secretsManagerClient.send(
          new GetSecretValueCommand({
              SecretId: aws_secretId,
              VersionStage: aws_versionStage, // VersionStage defaults to AWSCURRENT if unspecified
          })
      );
      console.log(secretsManagerResponse)
  } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      console.error(error);
  }

  const secret = await secretsManagerResponse.SecretString;

  //Mailchimp implementing
  mailchimpClient.setConfig({
      apiKey: secret,
      server: mailchimp_server_prefix
  })

  try {
      const response = await mailchimpClient.lists.addListMember(mailchimp_list_id, {
          email_address: email,
          status: "subscribed",
      });
      console.log('RESPONSE SUBSCRIPTION OK:', response);
      return {type: 'success',message:'Thank you for subscribing to In The Know YYC newsletters.'}
  } catch (error) {
      console.error('RESPONSE SUBSCRIPTION ERROR:', error);
      return {type: 'error',message:error.message}
  }
}

export default sendEmailSubscription;