/**
 * Enveloppes génériques pour rester aligné avec les réponses JSON Nest
 * (interceptors, format d'erreur unifié, etc.).
 */
export type ApiSuccess<T> = Readonly<{
	ok: true;
	data: T;
}>;

export type ApiFailure = Readonly<{
	ok: false;
	code: string;
	message: string;
	details?: unknown;
}>;

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
