import axios from "axios";

const ONE_HOUR_IN_SECONDS:number = 3600;


const axiosMetricsInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROMETHEUS_API_URL,
  timeout: 20000,
  headers: {},
});

axiosMetricsInstance.interceptors.response.use(
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


export default axiosMetricsInstance;
