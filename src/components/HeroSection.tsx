// src/components/HeroSection.tsx
import Link from 'next/link';
import React from "react";

export default function HeroSection() {
	return (
		<section className="bg-blue-600">
			<div className="max-w-6xl mx-auto p-8">
				<h1 className="text-4xl font-bold text-white">Welcome to StoreFront</h1>
				<p className="text-white mt-4">Shop our curated collection of premium products</p>
				<div className="mt-6">
					<Link href="/products" className="bg-white text-blue-600 px-6 py-3 rounded-md">
						Shop Now
					</Link>
				</div>
			</div>
		</section>
	);
}
