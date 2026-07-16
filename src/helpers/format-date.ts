const DAY = 86_400_000;

function startOfDay(timestamp: number): number {
	const date = new Date(timestamp);
	date.setHours(0, 0, 0, 0);
	return date.getTime();
}

/** Écart en jours calendaires entre deux timestamps (positif si `at` est passé). */
export function daysBetween(at: number, now: number): number {
	return Math.round((startOfDay(now) - startOfDay(at)) / DAY);
}

/** Titre de groupe pour une timeline : « Aujourd’hui », « Hier », sinon la date. */
export function formatDayLabel(at: number, now: number): string {
	const days = daysBetween(at, now);

	if (days === 0) return "Aujourd’hui";
	if (days === 1) return "Hier";
	if (days < 7) return `Il y a ${days} jours`;

	return new Date(at).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

/** Heure locale courte, ex. « 14:05 ». */
export function formatTime(at: number): string {
	return new Date(at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
