import Axios from "axios";
import { baseURL } from "./Config";

// Create axios client, pre-configured with baseURL
let API = Axios.create({
    baseURL: baseURL,
    timeout: 30000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
    API.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export default API;
