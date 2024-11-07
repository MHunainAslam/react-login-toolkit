import { API } from "./Api";

export const loginUser = async (logindata) => {
    const response = await API.post(`/auth/login`, logindata);
    return response.data;
};