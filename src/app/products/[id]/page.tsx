// src/app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getProductRepository } from '@/lib/di/container';
import { Metadata } from 'next';

interface ProductPageProps {
	params: {
		id: string;
	};
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const productRepository = getProductRepository();
	const response = await productRepository.getProductById(params.id);

	if (!response.data) {
		return {
			title: 'Product Not Found',
		};
	}

	return {
		title: `${response.data.title} | StoreFront`,
		description: response.data.description,
		openGraph: {
			title: response.data.title,
			description: response.data.description,
			images: [{ url: response.data.thumbnail }],
		},
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const productRepository = getProductRepository();
	const response = await productRepository.getProductById(params.id);

	if (response.error || !response.data) {
		notFound();
	}

	const product = response.data;

	// Calculate sale price if there's a discount
	const salePrice = product.discountPercentage
		? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
		: null;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Product Images */}
				<div className="space-y-4">
					<div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
						{/* Regular img tag with server-side rendering */}
						<img
							src={product.thumbnail}
							alt={product.title}
							className="object-contain w-full h-full"
						/>
					</div>

					<div className="grid grid-cols-4 gap-2">
						{product.images.map((image, index) => (
							<div key={index} className="relative h-24 bg-gray-100 rounded-md overflow-hidden">
								<img
									src={image}
									alt={`${product.title} - Image ${index + 1}`}
									className="object-cover w-full h-full"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Product Details */}
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
						<p className="mt-2 text-gray-600">{product.category.name}</p>
					</div>

					<div className="flex items-center">
						{[...Array(5)].map((_, i) => (
							<svg
								key={i}
								className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						))}
						<span className="ml-2 text-gray-600">{product.rating.toFixed(1)} rating</span>
					</div>

					<div>
						{salePrice ? (
							<div className="flex items-baseline">
								<span className="text-2xl font-bold text-red-600">${salePrice}</span>
								<span className="ml-2 text-lg text-gray-500 line-through">${product.price}</span>
								<span className="ml-2 text-green-600">
                  {product.discountPercentage?.toFixed(0)}% off
                </span>
							</div>
						) : (
							<span className="text-2xl font-bold text-gray-900">${product.price}</span>
						)}

						<p className="mt-2 text-sm text-gray-500">
							{product.stock > 0
								? `In stock - ${product.stock} units available`
								: 'Currently out of stock'}
						</p>
					</div>

					<div>
						<h3 className="text-lg font-medium text-gray-900">Description</h3>
						<p className="mt-2 text-gray-600">{product.description}</p>
					</div>

					<div className="pt-4">
						<button
							className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
							disabled={product.stock === 0}
						>
							{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
