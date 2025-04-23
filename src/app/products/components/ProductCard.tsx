'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/domain/product';

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const [imageError, setImageError] = useState(false);

	// Calculate sale price if there's a discount
	const salePrice = product.discountPercentage
		? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
		: null;

	return (
		<Link
			href={`/products/${product.id}`}
			className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
		>
			<div className="relative h-48 bg-gray-100">
				{imageError ? (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 text-2xl">
						{product.title.charAt(0).toUpperCase()}
					</div>
				) : (
					<img
						src={product.thumbnail}
						alt={product.title}
						className="w-full h-full object-contain"
						onError={() => setImageError(true)}
					/>
				)}
			</div>

			<div className="p-4">
				<h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
					{product.title}
				</h3>

				<div className="mt-2 flex items-center">
					{salePrice ? (
						<>
							<span className="text-red-600 font-medium">${salePrice}</span>
							<span className="ml-2 text-gray-500 text-sm line-through">${product.price}</span>
							<span className="ml-2 text-green-600 text-xs">
                {product.discountPercentage?.toFixed(0)}% off
              </span>
						</>
					) : (
						<span className="text-gray-900 font-medium">${product.price}</span>
					)}
				</div>

				<div className="mt-2 flex items-center text-sm">
					<div className="flex items-center">
						{[...Array(5)].map((_, i) => (
							<svg
								key={i}
								className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						))}
						<span className="ml-1 text-gray-600">{product.rating.toFixed(1)}</span>
					</div>

					<span className="mx-2 text-gray-300">•</span>

					<span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
          </span>
				</div>
			</div>
		</Link>
	);
}
