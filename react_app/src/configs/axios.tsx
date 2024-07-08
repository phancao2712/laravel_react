import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.response.use(
    response => {
        return response.data ? response.data : response
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance
