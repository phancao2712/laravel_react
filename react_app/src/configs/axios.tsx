import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const callApi : AxiosInstance = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
    withCredentials : true,
    headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

const refreshToken = async () => {
    try {
        const response = await callApi.post('/auth/refresh')
        return response.data
    } catch (error) {
        throw new Error("Không thể khởi tạo access token")
    }
}

axios.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        const originalRequest = error.config as AxiosRequestConfig & {_retry?: boolean}
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            try {
                await refreshToken();
                return callApi(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
);

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

export default axios
