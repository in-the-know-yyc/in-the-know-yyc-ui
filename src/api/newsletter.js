//import axios from 'axios';
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import mailchimpClient from "@mailchimp/mailchimp_marketing";

//const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;
const secretId = process.env.AWS_MAILCHIMP_API_KEY || process.env.NEXT_PUBLIC_AWS_MAILCHIMP_API_KEY;
const versionStage = "AWSCURRENT"

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
      region: process.env.aws_region,
  });

  let secretsManagerResponse;

  try {
      secretsManagerResponse = await secretsManagerClient.send(
          new GetSecretValueCommand({
              SecretId: secretId,
              VersionStage: versionStage, // VersionStage defaults to AWSCURRENT if unspecified
          })
      );
  } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      console.error(error);
  }

  const secret = secretsManagerResponse.SecretString;

  //Mailchimp implementing
  mailchimpClient.setConfig({
      apiKey: secret,
      server: process.env.MAILCHIMP_SERVER_PREFIX || process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX
  })

  try {
      //const response = await axios.post(`${api_endpoint}/subscribe`, data);
      const response = await mailchimpClient.lists.addListMember(process.env.MAILCHIMP_LIST_ID || process.env.NEXT_PUBLIC_MAILCHIMP_LIST_ID, {
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