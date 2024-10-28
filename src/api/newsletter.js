import axios from 'axios';

const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function sendEmailSubscription(email){
  
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - -')
  console.log('- - - - - - - ENTRA EMAIL SUBSCRIPTION - - - - - - -')
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - -')
  
  const data = {
      email: email
  };

  try {
      const response = await axios.post(`${api_endpoint}/subscribe`, data);
      console.log('RESPONSE SUBSCRIPTION OK:', response);
      return {type: 'success',message:'Thank you for subscribing to In The Know YYC newsletters.'}
  } catch (error) {
      console.error('RESPONSE SUBSCRIPTION ERROR:', error);
      return {type: 'error',message:error.message}
  }
}

export default sendEmailSubscription;