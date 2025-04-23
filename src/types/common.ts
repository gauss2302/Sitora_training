// src/types/common.ts
export type ApiResponse<T> = {
	data: T | null;
	error: Error | null;
	status: number;
};

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface FilterParams {
	[key: string]: string | number | boolean | undefined;
}

export type QueryParams = PaginationParams & FilterParams;
