import axios from 'axios';

export async function sendEmailSubscription(email) {
    const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;
    try {
        const response = await axios.post(`${api_endpoint}/subscribe`, {email_address: email}, {headers: { 'Content-Type': 'application/json' }});
        return (response.data.status === "subscribed") ? {type: 'success',message:'Thank you for subscribing to In The Know YYC newsletters.'} : {type: 'error',message:'There was an error in the subscription. Please, try again later.'}
    } catch (error) {
        console.error('Error sending email:', error);
        
        const message = (error.response.data.message) ? parseErrorMessage(error.response.data.message) : 'There was an error in the subscription. Please, try again later.';
        
        return {type: 'error', message: message};
    }
}

export default sendEmailSubscription;

export function parseErrorMessage(text){
    if(text){
        const p1 = text.split('{');
        if(p1[1]){
            const p2 = p1[1].split('}');
            if(p2[0]){
                const info = JSON.parse("{"+p2[0]+"}");
                if(info.title){
                    return info.title;
                }
            }
        }
    }
    return text;
}