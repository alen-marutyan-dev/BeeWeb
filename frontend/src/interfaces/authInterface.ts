interface User {
    _id: string;
    fullName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface AuthResponse {
    status: number;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

export interface LoginPayload {
    token: string;
    user: User;
}

export interface SignupPayload {
    token: string;
    user: User;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}


export type { User, AuthResponse, AuthState, SignupPayload, LoginPayload }