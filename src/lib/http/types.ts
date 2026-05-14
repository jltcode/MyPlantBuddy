export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type HttpOk<T> = Readonly<{
	ok: true;
	status: number;
	data: T;
}>;

export type HttpErr = Readonly<{
	ok: false;
	status: number;
	message: string;
	body?: unknown;
}>;

export type HttpResult<T> = HttpOk<T> | HttpErr;

export type HttpRequestOptions = Readonly<{
	headers?: Record<string, string>;
	body?: unknown;
	signal?: AbortSignal;
}>;
