// src/app/not-found.tsx
import Link from 'next/link';
import React from "react";

export default function NotFound() {
	return (
		<div className="min-h-[70vh] flex flex-col justify-center items-center">
			<h1 className="text-4xl font-bold text-gray-900">404</h1>
			<h2 className="mt-2 text-2xl font-medium text-gray-700">Page not found</h2>
			<p className="mt-4 text-gray-600">
				The page you are looking for does not exist or has been moved.
			</p>
			<Link
				href="/"
				className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
			>
				Go back home
			</Link>
		</div>
	);
}
