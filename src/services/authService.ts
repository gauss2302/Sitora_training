// src/services/authService.ts
import { LoginCredentials, LoginResponse } from '@/types/auth';

const API_URL = 'https://fakestoreapi.com';

export const authService = {
	async login(credentials: LoginCredentials): Promise<LoginResponse> {
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: credentials.username,
					password: credentials.password
					// FakeStore API doesn't use expiresInMins
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || 'Login failed');
			}

			// FakeStore API returns a token in the response
			const { token } = await response.json();

			// Store the token in localStorage
			localStorage.setItem('auth_token', token);

			// FakeStore API doesn't return user details with the token,
			// so we need to fetch user profile separately
			const userProfile = await this.fetchUserProfile(token);

			return {
				...userProfile,
				token
			};
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	},

	async fetchUserProfile(token: string): Promise<Omit<LoginResponse, 'token'>> {
		// In a real implementation, you would fetch user profile here
		// But FakeStore API doesn't provide a dedicated endpoint

		// For this example, we'll return mock user data
		// In a real app, you'd fetch this from an endpoint like /users/me
		return {
			id: 1,
			username: 'john_doe',
			email: 'john@example.com',
			firstName: 'John',
			lastName: 'Doe',
			gender: 'male',
			image: 'https://robohash.org/johnDoe',
		};
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
