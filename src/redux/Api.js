import axios from "axios";
import toast from "react-hot-toast";

const baseURL = "https://api.eobusinessclub.com/api"
const API = axios.create({ baseURL: `${baseURL}` });
let cachedToken = null;

const addTokenToRequest = async (config) => {
    if (!cachedToken) {
        cachedToken = "session?.user?.token" // Cache the token
    }

    if (cachedToken) {
        config.headers.Authorization = `Bearer ${cachedToken}`;
    }

    return config;
};
// Global error handler
const handleErrorResponse = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        // if (status === 401) {
        //     signOut();
        // } else if (status === 404) {
        //     console.log("404")
        //     window.history.back()
        // }
        // else if (status === 500) {
        //     window.history.back()
        // }
        // else if (status === 403) {
        //     window.history.back()
        // }

        // Handle success: false globally
        if (data?.success === false && data?.errors) {
            const errorMessages = data.errors;
            for (const key in errorMessages) {
                if (errorMessages.hasOwnProperty(key)) {
                    const fieldErrors = errorMessages[key];
                    fieldErrors.forEach((message) => toast.error(`${key}: ${message}`));
                }
            }
        } else if (data?.success === false) {
            // If no field-specific errors, show a general error message
            toast.error(data.message || "Something went wrong");
        }
        // Return the error data
        return Promise.reject(data?.message || "An error occurred");
    }

    toast.error("Network Error");
    return Promise.reject(error.message || "Network Error");
};

// Response Interceptor to show success messages for PUT, POST, and DELETE
API.interceptors.response.use(
    (response) => {
        const method = response.config.method.toUpperCase();

        // Only show success messages for PUT, POST, DELETE
        if (["PUT", "POST", "DELETE"].includes(method) && response.data?.success !== false) {
            toast.success(response.data.message || "Operation successful!");
        }

        // Check for success: false in the response and handle it
        if (response.data?.success === false) {
            toast.error(response.data.message || "An error occurred");
            return Promise.reject(response.data.message || "An error occurred");
        }

        return response;
    },
    handleErrorResponse
);

// Use the interceptor on both instances
API.interceptors.request.use(addTokenToRequest, (error) => Promise.reject(error));

export { API };
