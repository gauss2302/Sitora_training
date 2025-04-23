// src/app/products/components/ProductListSkeleton.tsx

interface ProductListSkeletonProps {
	count?: number;
}

export default function ProductListSkeleton({ count = 8 }: ProductListSkeletonProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
					<div className="h-48 bg-gray-200" />
					<div className="p-4 space-y-3">
						<div className="h-5 bg-gray-200 rounded w-2/3" />
						<div className="h-4 bg-gray-200 rounded w-1/4" />
						<div className="h-4 bg-gray-200 rounded w-full" />
						<div className="h-4 bg-gray-200 rounded w-3/4" />
					</div>
				</div>
			))}
		</div>
	);
}
