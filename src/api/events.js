import axios from 'axios';
import moment from "moment/moment";

const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getFilteredEvents(filters = null) {
  //NOTE: filters: searchText | startDate | eventType (industry)

  // PARAMS NOTE: 
  //    SSR uses different params to keep the URL user-friendly. 
  //    CSR uses the API required params to maintain the state variables

  const params = {
    searchText: (filters && filters.search) ? filters.search : (filters && filters.searchText) ? filters.searchText : '',
    startDate: (filters && filters.date) ? moment(filters.date).format('YYYY-MM-DDTHH:mm:ss') : (filters && filters.startDate) ? moment(filters.startDate).format('YYYY-MM-DDTHH:mm:ss') : '',
    eventType: (filters && filters.industry) ? filters.industry : '',
    page: (filters && filters.page) ? filters.page : 0,
    sortField: 'eventDate',
    sortDirection: 'asc',
    size: 2
  }


  try {
    const response = await axios.get(`${api_endpoint}/events`, { params });
    return {params: {...params, page:params.page+1}, data: response.data};
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

export async function getNextEvents() { // LATEST EVENTS | HOME
  // ONLY DURING TESTING, THIS WILL CHANGE TO NOW TO SHOW REAL RESULTS
  const dateNow = new Date();

  //console.log('DATENOW:',dateNow)

  const dateTimeNow = moment(dateNow).format('YYYY-MM-DDTHH:mm:ss');

  try {
    const params = {
      sortField: 'eventDate',
      sortDirection: 'asc',
      size: 6,
      startDate: dateTimeNow,
      searchText: ''
    }

    const response = await axios.get(`${api_endpoint}/events`, { params });

    return response.data.content;

  } catch (error) {
    console.error('Error fetching next events:', error.message);
    return null;
  }
}