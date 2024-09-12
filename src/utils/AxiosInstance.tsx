import axios from "axios";
import config from "./config";
import Cookies from "js-cookie";

const baseURL = config.API_URL;
const authToken = Cookies.get('authToken');

const AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 35000,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer ",
    "Content-Type": "multipart/form-data",
  },
});

AxiosInstance.interceptors.request.use(
  async (config: any) => {
    axios.defaults.timeout = 35000;
    config.baseURL = baseURL;
    const token = authToken;
    if (token) {
      config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
  },
  (error: any) => Promise.reject(error.response.data)
);


AxiosInstance.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  (errors: any) => {
    return errors.response.data;
  }
);


export default AxiosInstance;
