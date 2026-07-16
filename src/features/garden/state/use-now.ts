import { useEffect, useState } from "react";

/**
 * Horloge partagée : la santé des plantes se dérivant du temps, l’UI doit se
 * rafraîchir périodiquement sans quoi les jauges resteraient figées.
 */
export function useNow(intervalMs = 60_000): number {
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), intervalMs);
		return () => clearInterval(timer);
	}, [intervalMs]);

	return now;
}
