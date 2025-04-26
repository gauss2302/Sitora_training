'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, LoginCredentials, User } from '@/types/auth';
import { authService } from '@/services/authService';

// Initial state
const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

// Auth context type
interface AuthContextType extends AuthState {
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, setState] = useState<AuthState>(initialState);

	// Check for existing token on mount
	useEffect(() => {
		const token = authService.getToken();
		if (token) {
			setState(prev => ({
				...prev,
				isAuthenticated: true,
				isLoading: false,
			}));
			// Ideally you would validate the token here or fetch the user profile
		}
	}, []);

	// Login function
	const login = async (credentials: LoginCredentials) => {
		setState(prev => ({ ...prev, isLoading: true, error: null }));

		try {
			const userData = await authService.login(credentials);
			setState({
				user: userData as User,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			});
		} catch (error) {
			setState({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: error instanceof Error ? error.message : 'Failed to login',
			});
		}
	};

	// Logout function
	const logout = () => {
		authService.logout();
		setState({
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,
		});
	};

	// Context value
	const value = {
		...state,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
