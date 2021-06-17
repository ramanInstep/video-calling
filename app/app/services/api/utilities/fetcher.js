import axios from 'axios';

const DEFAULT_CONFIG = {
  baseURL: "http://localhost:4000/graphql",
};

const AXIOS_INSTANCE = axios.create(DEFAULT_CONFIG);

export default AXIOS_INSTANCE;
