// src/lib/api/repositories/product-repository.ts
import { Product, ProductListResponse } from '@/types/domain/product';
import { ApiResponse } from '@/types/common';
import { HttpClient } from '@/lib/api/fetcher';
import { buildQueryString } from '@/lib/utils/url';

export interface IProductRepository {
	getProducts(params?: { limit: number }): Promise<ApiResponse<ProductListResponse>>;
	getProductById(id: string): Promise<ApiResponse<Product>>;
}

export class ProductRepository implements IProductRepository {
	constructor(private readonly httpClient: HttpClient) {}

	async getProducts(params?: { limit: number }): Promise<ApiResponse<ProductListResponse>> {
		const queryString = params ? buildQueryString(params) : '';
		return await this.httpClient.fetch<ProductListResponse>(`/products${queryString}`, {
			next: {
				revalidate: 60 * 5, // 5 minutes
				tags: ['products']
			}
		});
	}

	async getProductById(id: string): Promise<ApiResponse<Product>> {
		return await this.httpClient.fetch<Product>(`/products/${id}`, {
			next: {
				revalidate: 60 * 60, // 1 hour
				tags: [`product-${id}`]
			}
		});
	}
}
