import axios from 'axios';

export async function sendEmailSubscription(email) {
    const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;
    try {
        const response = await axios.post(`${api_endpoint}/subscribe`, {email_address: email}, {headers: { 'Content-Type': 'application/json' }});
        console.log('API ENDPOINT:', api_endpoint)
        console.log('MAIL:',email)
        console.log('RESPONSE:',response)
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return null;
    }
}

export default sendEmailSubscription;