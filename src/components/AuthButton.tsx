'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import React from "react";

export default function AuthButton() {
	const { isAuthenticated, user } = useAuth();

	return (
		<div className="flex-shrink-0 ml-4">
			{isAuthenticated ? (
				<Link
					href="/dashboard"
					className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
          <span className="mr-1.5">
            {user?.firstName || 'Account'}
          </span>
					{user?.image ? (
						<img
							src={user.image}
							alt={user.firstName}
							className="h-6 w-6 rounded-full"
						/>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
						</svg>
					)}
				</Link>
			) : (
				<Link
					href="/login"
					className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
					</svg>
					Login
				</Link>
			)}
		</div>
	);
}
