import axios from 'axios';
import moment from "moment/moment";

const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getFilteredEvents(params = null){
  //const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  
  console.log('LLEGA GET-FILTERED-EVENTS ( - - - 2 - - - )');
  console.log(' - params:',params);
  console.log(' - endpoint:', api_endpoint);
  console.log('.ENV - SSR:', process.env.API_ENDPOINT);
  console.log('.ENV - CSR:', process.env.NEXT_PUBLIC_API_ENDPOINT);
  
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
  try {
    const response = await axios.get(`${api_endpoint}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

export async function getEventById(id = null) {
  
  try {
    const response = await axios.get(`${api_endpoint}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id = ${id}:`, error);
    return null;
  }

}

export async function getNextEvents(){
  
  const dateForTestingWithResults = '2024-10-23';

  const dateTimeNow = moment(dateForTestingWithResults).format('YYYY-MM-DDTHH:mm:ss');

  try {
    const params = {
      sortField: 'eventDate',
      sortDirection: 'asc',
      size:6,
      startDate: dateTimeNow
    }
    
    const response = await axios.get(`${api_endpoint}/events`, {params});
    
    return response.data.content;

  } catch (error) {
    console.error('Error fetching next events:', error.message);
    return null;
  }
}