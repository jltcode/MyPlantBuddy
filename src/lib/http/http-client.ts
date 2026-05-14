import { env } from "@/core/config/env";
import { API_VERSION_PREFIX } from "@/shared/constants/api";

import type { HttpMethod, HttpRequestOptions, HttpResult } from "./types";

export type HttpClientConfig = Readonly<{
	baseUrl?: string;
	defaultHeaders?: Readonly<Record<string, string>>;
}>;

const joinUrl = (base: string, path: string): string => {
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}
	const normalizedBase = base.replace(/\/$/, "");
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${normalizedBase}${normalizedPath}`;
};

const parseJson = async (response: Response): Promise<unknown> => {
	const text = await response.text();
	if (!text) {
		return null;
	}
	try {
		return JSON.parse(text) as unknown;
	} catch {
		return text;
	}
};

export function createHttpClient(config?: HttpClientConfig) {
	const baseUrl = (config?.baseUrl ?? env.apiBaseUrl).replace(/\/$/, "");
	const defaultHeaders = config?.defaultHeaders ?? {};

	const request = async <T>(
		method: HttpMethod,
		path: string,
		init?: HttpRequestOptions,
	): Promise<HttpResult<T>> => {
		const url = joinUrl(baseUrl, path);
		if (!url.startsWith("http://") && !url.startsWith("https://") && !baseUrl) {
			return {
				ok: false,
				status: 0,
				message: "EXPO_PUBLIC_API_BASE_URL n'est pas défini : impossible d'appeler l'API.",
			};
		}

		const headers: Record<string, string> = {
			Accept: "application/json",
			...defaultHeaders,
			...init?.headers,
		};

		let body: string | undefined;
		if (init?.body !== undefined) {
			headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
			body = typeof init.body === "string" ? init.body : JSON.stringify(init.body);
		}

		let response: Response;
		try {
			response = await fetch(url, { method, headers, body, signal: init?.signal });
		} catch (error) {
			const message = error instanceof Error ? error.message : "Erreur réseau";
			return { ok: false, status: 0, message };
		}

		const payload = await parseJson(response);

		if (!response.ok) {
			return {
				ok: false,
				status: response.status,
				message: typeof payload === "object" && payload !== null && "message" in payload
					? String((payload as { message?: unknown }).message ?? response.statusText)
					: response.statusText,
				body: payload,
			};
		}

		return { ok: true, status: response.status, data: payload as T };
	};

	return {
		baseUrl,
		get: <T>(path: string, init?: HttpRequestOptions) => request<T>("GET", path, init),
		post: <T>(path: string, init?: HttpRequestOptions) => request<T>("POST", path, init),
		put: <T>(path: string, init?: HttpRequestOptions) => request<T>("PUT", path, init),
		patch: <T>(path: string, init?: HttpRequestOptions) => request<T>("PATCH", path, init),
		delete: <T>(path: string, init?: HttpRequestOptions) => request<T>("DELETE", path, init),
	};
}

export type HttpClient = ReturnType<typeof createHttpClient>;

/** Client par défaut : base URL depuis l'environnement + préfixe API versionné. */
export const httpClient = createHttpClient({
	baseUrl: env.apiBaseUrl ? `${env.apiBaseUrl}${API_VERSION_PREFIX}` : "",
});
