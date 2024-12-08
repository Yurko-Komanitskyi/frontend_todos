import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3005/',
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:3005/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
