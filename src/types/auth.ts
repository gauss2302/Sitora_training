// src/types/auth.ts - Updated for FakeStore API
export interface User {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	token: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
	expiresInMins?: number; // Not used by FakeStore API but kept for compatibility
}

export interface LoginResponse {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	token: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

// FakeStore API token response
export interface TokenResponse {
	token: string;
}
