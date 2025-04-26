'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import React, { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
	const { user, logout } = useAuth();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = () => {
		setIsLoggingOut(true);
		logout();
		// No need to redirect, the ProtectedRoute will handle that
		setIsLoggingOut(false);
	};

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gray-50">
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<div className="px-4 py-6 sm:px-0">
							<div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
								<div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
									<div className="px-4 py-5 sm:px-6">
										<h3 className="text-lg font-medium text-gray-900">
											User Profile
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											Your personal information
										</p>
									</div>
									<div className="px-4 py-5 sm:p-6">
										{user ? (
											<div className="flex flex-col md:flex-row">
												<div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
													{user.image ? (
														<img
															src={user.image}
															alt={`${user.firstName} ${user.lastName}`}
															className="h-32 w-32 rounded-full object-cover"
														/>
													) : (
														<div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-2xl">
                                {user.firstName?.[0]}
								  {user.lastName?.[0]}
                              </span>
														</div>
													)}
												</div>
												<div className="md:w-2/3">
													<dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
														<div>
															<dt className="text-sm font-medium text-gray-500">
																Full name
															</dt>
															<dd className="mt-1 text-sm text-gray-900">
																{user.firstName} {user.lastName}
															</dd>
														</div>
														<div>
															<dt className="text-sm font-medium text-gray-500">
																Username
															</dt>
															<dd className="mt-1 text-sm text-gray-900">
																{user.username}
															</dd>
														</div>
														<div>
															<dt className="text-sm font-medium text-gray-500">
																Email address
															</dt>
															<dd className="mt-1 text-sm text-gray-900">
																{user.email}
															</dd>
														</div>
														<div>
															<dt className="text-sm font-medium text-gray-500">
																Gender
															</dt>
															<dd className="mt-1 text-sm text-gray-900">
																{user.gender}
															</dd>
														</div>
														<div className="sm:col-span-2">
															<dt className="text-sm font-medium text-gray-500">
																User ID
															</dt>
															<dd className="mt-1 text-sm text-gray-900">
																{user.id}
															</dd>
														</div>
													</dl>

													<div className="mt-6 flex flex-col sm:flex-row gap-4">
														<button
															onClick={handleLogout}
															disabled={isLoggingOut}
															className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
																isLoggingOut
																	? 'bg-red-400'
																	: 'bg-red-600 hover:bg-red-700'
															} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
														>
															{isLoggingOut ? 'Logging out...' : 'Logout'}
														</button>

														<Link
															href="/"
															className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
														>
															Return to Store
														</Link>
													</div>
												</div>
											</div>
										) : (
											<p className="text-gray-700">
												Loading user information...
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
