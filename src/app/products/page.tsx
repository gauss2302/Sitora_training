// src/app/products/page.tsx
import { Suspense } from 'react';
import { getProductRepository } from '@/lib/di/container';
import ProductList from './components/ProductList';
import ProductListSkeleton from './components/ProductListSkeleton';
import ErrorBoundary from '@/components/ErrorBoundary';
import { logInfo } from '@/lib/logger';

interface ProductsPageProps {
	searchParams: {
		page?: string;
		limit?: string;
		category?: string;
	};
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
	// Parse and validate query parameters
	const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
	const limit = searchParams.limit ? parseInt(searchParams.limit, 10) : 10;
	const category = searchParams.category;

	// Log page visit with params
	logInfo('Products page visited', { page, limit, category });

	// Fetch data
	const productRepository = getProductRepository();
	const response = await productRepository.getProducts({
		page,
		limit,
		...(category && { category })
	});

	// Handle API errors
	if (response.error) {
		throw new Error(`Failed to fetch products: ${response.error.message}`);
	}

	const productData = response.data;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Products</h1>

			<ErrorBoundary fallback={<p>Something went wrong loading products. Please try again later.</p>}>
				<Suspense fallback={<ProductListSkeleton count={limit} />}>
					<ProductList
						initialData={productData}
						currentPage={page}
						itemsPerPage={limit}
					/>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
