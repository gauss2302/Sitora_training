// src/services/authService.ts
import { LoginCredentials, LoginResponse } from '@/types/auth';

const API_URL = 'https://dummyjson.com';

export const authService = {
	async login(credentials: LoginCredentials): Promise<LoginResponse> {
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
				credentials: 'include', // Include cookies in the request
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Login failed');
			}

			const data = await response.json();
			// Store the token in localStorage
			localStorage.setItem('auth_token', data.token);
			return data;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	},

	logout(): void {
		// Clear auth data from localStorage
		localStorage.removeItem('auth_token');
	},

	getToken(): string | null {
		// Get token from localStorage
		if (typeof window !== 'undefined') {
			return localStorage.getItem('auth_token');
		}
		return null;
	},

	isAuthenticated(): boolean {
		// Check if user is authenticated
		return !!this.getToken();
	},
};
