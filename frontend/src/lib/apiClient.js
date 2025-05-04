import axios from "axios"
import { notification } from "antd";

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const GET_USER_INFO = `${AUTH_ROUTES}/profile`
const HOST = import.meta.env.VITE_SERVER_URL;

const apiClient = axios.create({
    baseURL : HOST,
})

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && error.config.url !== "/login") {
        notification.error({
          message: "Session expired!",
        });
        
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

export default apiClient;