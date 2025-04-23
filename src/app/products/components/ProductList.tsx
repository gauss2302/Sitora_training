'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProductListResponse, Product } from '@/types/domain/product';
import ProductCard from './ProductCard';
import Pagination from '@/components/ui/Pagination';

interface ProductListProps {
	initialData: ProductListResponse;
	currentPage: number;
	itemsPerPage: number;
}

export default function ProductList({
										initialData,
										currentPage,
										itemsPerPage
									}: ProductListProps) {
	const [products, setProducts] = useState<Product[]>(initialData.products);
	const [totalItems, setTotalItems] = useState<number>(initialData.total);
	const router = useRouter();
	const pathname = usePathname();

	// Update state when props change (e.g., when user navigates between pages)
	useEffect(() => {
		setProducts(initialData.products);
		setTotalItems(initialData.total);
	}, [initialData]);

	// Calculate pagination values
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	// Handle page change
	const handlePageChange = (page: number) => {
		// Update URL with new page number
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set('page', page.toString());
		router.push(`${pathname}?${searchParams.toString()}`);
	};

	if (products.length === 0) {
		return <div className="text-center py-10">No products found</div>;
	}

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
