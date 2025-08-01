import { UserProps } from "../types";
import { BASE_URL } from "../constants";
import axios from "axios";

export const login = async (email: string, password: string): Promise<{ token: string }> => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
        return response.data
    } catch (error: any) {   
        console.error(error);
        const msg = error?.response?.data?.msg || "Login failed";   
        throw new Error(msg);
    }
}

export const register = async (email: string, password: string, name: string, avatar?: string | null): Promise<{ user: UserProps, token: string }> => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, { email, password, name, avatar });
        return response.data;
    } catch (error: any) {
        console.error(error);
        const msg = error?.response?.data?.msg || "Registration failed";
        throw new Error(msg);
    }
}

export const checkEmail = async (email: string): Promise<{ exists: boolean }> => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/check-email`, { email });
        return response.data;
    } catch (error: any) {
        console.error(error);
        const msg = error?.response?.data?.msg || "Email check failed";
        throw new Error(msg);
    }
}