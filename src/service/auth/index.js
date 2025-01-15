import axios from 'axios';

const authClient = axios.create({
  baseURL: 'http://localhost:8081/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authClient;
