'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// If not authenticated and not loading, redirect to login
		if (!isAuthenticated && !isLoading) {
			router.push('/login');
		}
	}, [isAuthenticated, isLoading, router]);

	// Show loading state
	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	// If authenticated, render children
	return isAuthenticated ? <>{children}</> : null;
}
