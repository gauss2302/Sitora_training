'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const { login, isLoading, error, isAuthenticated } = useAuth();
	const router = useRouter();

	// Redirect if already authenticated
	useEffect(() => {
		if (isAuthenticated) {
			router.push('/dashboard');
		}
	}, [isAuthenticated, router]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await login({
				username,
				password,
			});
			// Redirect happens in the useEffect hook
		} catch (error) {
			// Error is handled in the auth context
			console.error('Login submission error:', error);
		}
	};

	// Function to fill demo credentials
	const fillDemoCredentials = () => {
		setUsername('john_doe');
		setPassword('pass123');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or continue shopping as a guest
					</p>
				</div>

				{error && (
					<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
						<div className="flex">
							<div>
								<p className="text-sm text-red-700">{error}</p>
							</div>
						</div>
					</div>
				)}

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="username" className="sr-only">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								autoComplete="username"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
								Forgot your password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
								isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
							} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
						>
							{isLoading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>

					<div className="text-center">
						<button
							type="button"
							onClick={fillDemoCredentials}
							className="text-sm text-blue-600 hover:text-blue-500 font-medium"
						>
							Use demo credentials (john_doe / pass123)
						</button>
					</div>

					<div className="text-center">
						<Link
							href="/"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Return to Store
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
