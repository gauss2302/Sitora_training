// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Products', href: '/products' },
		{ name: 'Categories', href: '/categories' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' },
	];

	const isActive = (path: string) => pathname === path;

	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						{/* Logo */}
						<div className="flex-shrink-0 flex items-center">
							<Link href="/" className="text-2xl font-bold text-blue-600">
								StoreFront
							</Link>
						</div>

						{/* Desktop navigation */}
						<nav className="hidden sm:ml-8 sm:flex sm:space-x-8">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 ${
										isActive(item.href)
											? 'border-blue-500 text-gray-900'
											: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
									}`}
								>
									{item.name}
								</Link>
							))}
						</nav>
					</div>

					{/* Right section - Search and Cart */}
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<button
								type="button"
								className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
							>
								<span className="sr-only">Search</span>
								<svg
									className="h-6 w-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
						</div>

						<div className="flex-shrink-0 ml-4">
							<Link
								href="/cart"
								className="p-1 text-gray-400 hover:text-gray-500 relative focus:outline-none"
							>
								<span className="sr-only">Cart</span>
								<svg
									className="h-6 w-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
							</Link>
						</div>

						{/* Mobile menu button */}
						<div className="flex items-center sm:hidden ml-4">
							<button
								type="button"
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								<span className="sr-only">Open main menu</span>
								{isMenuOpen ? (
									<svg
										className="block h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								) : (
									<svg
										className="block h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
				<div className="pt-2 pb-3 space-y-1">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
								isActive(item.href)
									? 'bg-blue-50 border-blue-500 text-blue-700'
									: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
}
