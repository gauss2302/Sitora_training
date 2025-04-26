// src/lib/di/container.ts
import { HttpClient } from '@/lib/api/fetcher';
import { ProductRepository } from '@/lib/api/repositories/product-repository';

// Simple dependency injection container
export class Container {
	private static instance: Container;
	private services: Map<string, unknown> = new Map();

	private constructor() {
		// Initialize base services
		const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';
		const httpClient = new HttpClient(baseUrl);

		// Register repositories
		this.services.set('httpClient', httpClient);
		this.services.set('productRepository', new ProductRepository(httpClient));
	}

	static getInstance(): Container {
		if (!Container.instance) {
			Container.instance = new Container();
		}
		return Container.instance;
	}

	get<T>(serviceKey: string): T {
		const service = this.services.get(serviceKey);
		if (!service) {
			throw new Error(`Service ${serviceKey} not found in container`);
		}
		return service as T;
	}
}

// Export helper functions to get services
export function getProductRepository(): ProductRepository {
	return Container.getInstance().get<ProductRepository>('productRepository');
}
