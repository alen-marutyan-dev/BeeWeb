import axios from 'axios';
import getTokenFromCookie from "@/utils/getTokenFromCookie";

interface CustomRequestConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    auth?: boolean;
    headers?: Record<string, string>;
    data?: Record<string, any>;
}

const customRequest = async <T>(config: CustomRequestConfig): Promise<T> => {
    try {
        const token = config.auth ? getTokenFromCookie() : null;

        const headers = {
            ...(config.headers || {}),
            ...(config.auth ? { Authorization: `Bearer ${token}` } : {}),
        };

        const axiosConfig = {
            url: config.url,
            method: config.method,
            headers,  // Correctly merged headers
            baseURL: 'http://localhost:3001/api',
            data: config.data,
        };

        const response = await axios.request<T>(axiosConfig);
        return response.data;
    } catch (error) {
        console.error('Error in customRequest:', error);
        throw error;
    }
};

export default customRequest;
