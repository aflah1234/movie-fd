import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    withCredentials: true,
    timeout: 30000, // 30 second timeout (increased for serverless cold starts)
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;