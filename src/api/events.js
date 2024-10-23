import axios from 'axios';

export async function getFilteredEvents(params = null){
  console.log('LLEGA GET-FILTERED-EVENTS','params:',params,'endpoint:', process.env.API_ENDPOINT);
  try {
    const response = await axios.get(`${process.env.API_ENDPOINT}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

export async function getEventById(id = null) {
  try {
    const response = await axios.get(`${process.env.API_ENDPOINT}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id = ${id}:`, error);
    return null;
  }

}