import axios from "axios";

const BASE_URL = "http://localhost:9090";
// const BASE_URL = 'http://localhost:3000/api/v1';

export default axios.create({
  baseURL: BASE_URL,
});
