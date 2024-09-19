import customRequest from "@/utils/customRequest";
import { AuthResponse } from "@/interfaces/authInterface";

export const AuthService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        return await customRequest<AuthResponse>({
            url: '/auth/login',
            method: 'POST',
            data: { email, password }
        });
    },
    signup: async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
        return await customRequest<AuthResponse>({
            url: '/auth/signup',
            method: 'POST',
            data: { email, password, fullName }
        });
    }
};
