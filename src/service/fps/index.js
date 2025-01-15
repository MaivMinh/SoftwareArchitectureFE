import axios from 'axios';

const fpsClient = axios.create({
  baseURL: 'http://file.vougame.online/file',
  headers: {
    'Content-Type': 'application/json',
  },
});
const fpsEndpoint = 'http://file.vougame.online/file';

export { fpsClient, fpsEndpoint };
