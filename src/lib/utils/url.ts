// src/lib/utils/url.ts
import { QueryParams } from '@/types/common';

export function buildQueryString(params: QueryParams): string {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value));
		}
	});

	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : '';
}
