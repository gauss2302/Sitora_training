// src/types/domain/product.ts
export interface ProductCategory {
	id: string;
	name: string;
	slug: string;
}

export interface Product {
	id: string;
	title: string;
	description: string;
	price: number;
	discountPercentage?: number;
	rating: number;
	stock: number;
	category: ProductCategory;
	thumbnail: string;
	images: string[];
	createdAt: string;
	updatedAt: string;
}

export interface ProductListResponse {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}
