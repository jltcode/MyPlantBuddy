import { QueryClient } from "@tanstack/react-query";

/**
 * Une instance par montage racine (évite le partage d’état entre tests / HMR).
 * Defaults adaptés mobile : staleTime, reconnect, focus (via `useTanstackFocusManager`).
 */
export function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60_000,
				gcTime: 86_400_000,
				retry: 2,
				refetchOnReconnect: true,
				refetchOnWindowFocus: true,
			},
			mutations: {
				retry: 1,
			},
		},
	});
}
