import axios from "axios";
import { getToken } from "./auth";

const http = require('http');
const https = require('https');
const api = axios.create({
  baseURL: `http://${window.location.hostname}:3000`,
  //60 sec timeout
  timeout: 60000,

  //keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;