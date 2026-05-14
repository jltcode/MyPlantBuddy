import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";

import { createQueryClient } from "./query-client";
import { useTanstackFocusManager } from "./use-tanstack-focus-manager";

type QueryProviderProps = Readonly<{
	children: ReactNode;
}>;

export function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(() => createQueryClient());
	useTanstackFocusManager();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
