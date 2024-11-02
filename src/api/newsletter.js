//import axios from 'axios';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import mailchimpClient from "@mailchimp/mailchimp_marketing";

//const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;
//AWS constants
const aws_region = process.env.AWS_REGION || process.env.NEXT_PUBLIC_AWS_REGION
const aws_secretId = process.env.AWS_MAILCHIMP_SECRET_NAME || process.env.NEXT_PUBLIC_AWS_MAILCHIMP_SECRET_NAME;
const aws_versionStage = "AWSCURRENT"

//AWS constants
const mailchimp_server_prefix = process.env.MAILCHIMP_SERVER_PREFIX || process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX
const mailchimp_list_id = process.env.MAILCHIMP_LIST_ID || process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID

// export const getSecretValue = async (secretName) => {
//     const client = new SecretsManagerClient({
//         region: aws_region
//     });
//     const response = await client.send(
//         new GetSecretValueCommand({
//             SecretId: secretName,
//             VersionStage: aws_versionStage,
//         }),
//     );
//     if (response.SecretString) {
//         return response.SecretString;
//     }
//
//     if (response.SecretBinary) {
//         return response.SecretBinary;
//     }
// };

// const secret = getSecretValue(aws_secretId).SecretString;

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

  // const data = {
  //   email: email,
  // };

  //AWS Secrets Manager implementing
  const secretsManagerClient = new SecretsManagerClient({
      region: aws_region,
  });

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
      //const response = await axios.post(`${api_endpoint}/subscribe`, data);
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