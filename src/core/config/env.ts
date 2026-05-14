/**
 * Variables d'environnement lues au build (Expo).
 * Définir EXPO_PUBLIC_API_BASE_URL pour pointer vers le futur backend Nest.
 */
const readPublicEnv = (key: `EXPO_PUBLIC_${string}`): string => {
	if (typeof process === "undefined" || !process.env[key]) {
		return "";
	}
	return process.env[key] ?? "";
};

export const env = {
	apiBaseUrl: readPublicEnv("EXPO_PUBLIC_API_BASE_URL").replace(/\/$/, ""),
} as const;

export type Env = typeof env;
