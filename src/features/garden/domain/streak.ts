const DAY = 86_400_000;

/** Jour calendaire local d’un timestamp — comparer des jours, pas des durées. */
function dayIndex(timestamp: number): number {
	const date = new Date(timestamp);
	return Math.floor((timestamp - date.getTimezoneOffset() * 60_000) / DAY);
}

export function isSameDay(a: number, b: number): boolean {
	return dayIndex(a) === dayIndex(b);
}

/**
 * Nouvelle valeur de série après un soin :
 * même jour → inchangée, lendemain → +1, au-delà → la série repart à 1.
 */
export function nextStreakDays(streakDays: number, lastActiveAt: number, now: number): number {
	const gap = dayIndex(now) - dayIndex(lastActiveAt);

	if (gap === 0) return Math.max(1, streakDays);
	if (gap === 1) return streakDays + 1;
	return 1;
}

/** Vrai quand le soin ouvre une nouvelle journée — les quêtes du jour repartent à zéro. */
export function opensNewDay(lastActiveAt: number, now: number): boolean {
	return !isSameDay(lastActiveAt, now);
}
