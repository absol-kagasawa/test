import axios from 'axios';

const DEFAULT_TIMEOUT = 10000;

const fetcher = axios.create({
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default fetcher;
