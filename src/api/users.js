import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import moment from "moment/moment";

const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

export const login = async (user, pass) => {

  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTZAZXguY29tIiwiaWF0IjoxNzMxODA4MDg4LCJleHAiOjE3MzE4MDk4ODh9.5xbAuwzrCduTxES7ig_inWJUU8PZ3BO2jbJTaa7tYGk';
  localStorage.setItem('authToken', token);
  return { type: 'success', message: 'Login successful!' }
  // try {
  //   const response = await axios.post(`${api_endpoint}/cms/login`, { email: user, password: pass });
  //   if (response.data.token) {
  //     localStorage.setItem('authToken', response.data.token);
  //     return { type: 'success', message: 'Login successful!' }
  //   } else {
  //     return { type: 'error', message: 'Invalid credentials. Please try again.' };
  //   }
  // } catch (error) {
  //   console.error('LOGIN ERROR:', error);
  //   return { type: 'error', message: 'There was an unespected error during login. Please try again later.' };
  // }
}

export const getUserByToken = async () => {
  const tokenParts = localStorage.getItem('authToken').split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const userEmail = payload.sub;

  try {
    //const user = await axiosInstance.get(`${api_endpoint}/users/email/${userEmail}`);
    const user = {
      id: 18,
      email: "user16@ex.com",
      fullName: "user16",
      createdAt: "2024-10-04T18:06:27",
      updatedAt: "2024-10-18T05:16:08",
      locked: false,
      expired: false,
      role: "ROLE_ADMIN",
      accountNonExpired: true,
      credentialsNonExpired: true,
      accountNonLocked: true,
      username: "user16@ex.com",
      authorities: [
          {
              authority: "ROLE_ADMIN"
          }
      ],
      enabled: true
  }
    console.log('USER:', user)
    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.fullName);
      localStorage.setItem('userRole', user.role);
      return true
    } else {
      return false;
    }
  } catch (error) {
    console.error('GET USER BY TOKEN EMAIL ERROR:', error);
    return false;
  }
}
