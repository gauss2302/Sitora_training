// src/lib/api/fetcher.ts
import { ApiResponse } from '@/types/common';
import { logError } from '@/lib/logger';

export type FetchOptions = {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
	headers?: HeadersInit;
	body?: BodyInit | null;
	cache?: RequestCache;
	next?: NextFetchRequestConfig;
};

export interface IHttpClient {
	fetch<T>(url: string, options?: FetchOptions): Promise<ApiResponse<T>>;
}

export class HttpClient implements IHttpClient {
	constructor(private readonly baseUrl: string) {}

	async fetch<T>(path: string, options?: FetchOptions): Promise<ApiResponse<T>> {
		const url = `${this.baseUrl}${path}`;

		try {
			const response = await fetch(url, {
				method: options?.method || 'GET',
				headers: {
					'Content-Type': 'application/json',
					...options?.headers,
				},
				body: options?.body,
				cache: options?.cache,
				next: options?.next,
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`API Error: ${response.status} - ${errorText}`);
			}

			const data = await response.json();

			return {
				data,
				error: null,
				status: response.status,
			};
		} catch (error) {
			const typedError = error instanceof Error ? error : new Error(String(error));
			logError('API Request Failed', {
				url,
				method: options?.method || 'GET',
				error: typedError.message,
			});

			return {
				data: null,
				error: typedError,
				status: 500,
			};
		}
	}
}
