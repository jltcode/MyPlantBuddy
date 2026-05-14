import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, type AppStateStatus, Platform } from "react-native";

/**
 * Sur iOS / Android, `window` n’existe pas : TanStack s’appuie sur `focusManager`
 * pour `refetchOnWindowFocus`. On le synchronise avec `AppState`.
 * Sur web, le comportement par défaut (visibility / focus) suffit.
 */
export function useTanstackFocusManager(): void {
	useEffect(() => {
		if (Platform.OS === "web") {
			return;
		}

		const onChange = (status: AppStateStatus) => {
			focusManager.setFocused(status === "active");
		};

		const subscription = AppState.addEventListener("change", onChange);
		onChange(AppState.currentState);

		return () => {
			subscription.remove();
		};
	}, []);
}
