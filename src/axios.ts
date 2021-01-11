import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // "http://137.193.65.47:8080"
  timeout: 20000,
  headers: {},
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      alert("You are not authorized (401)");
    }
    if (response.status === 403) {
      alert("You are not authorized for this action (403)");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

export default instance;
