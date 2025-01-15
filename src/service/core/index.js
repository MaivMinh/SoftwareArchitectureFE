import axios from 'axios';

const coreClient = axios.create({
  baseURL: 'http://localhost:8080/api/core',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default coreClient;
