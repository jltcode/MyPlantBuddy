import { daysBetween, formatDayLabel } from "@/helpers/format-date";

import type { CareEvent } from "@/features/garden/types";

export type CareEventGroup = {
	/** Jour calendaire, sert de clé de liste et d’ordre. */
	dayOffset: number;
	label: string;
	events: CareEvent[];
};

/** Regroupe l’historique par jour calendaire, du plus récent au plus ancien. */
export function groupCareEventsByDay(history: CareEvent[], now: number): CareEventGroup[] {
	const groups = new Map<number, CareEvent[]>();

	for (const event of history) {
		const offset = daysBetween(event.at, now);
		const bucket = groups.get(offset);
		if (bucket) bucket.push(event);
		else groups.set(offset, [event]);
	}

	return [...groups.entries()]
		.sort(([a], [b]) => a - b)
		.map(([dayOffset, events]) => ({
			dayOffset,
			label: formatDayLabel(events[0].at, now),
			events: [...events].sort((a, b) => b.at - a.at),
		}));
}

export type JournalStats = {
	careThisWeek: number;
	xpThisWeek: number;
	/** Jour de la semaine (0 = lundi) → nombre de soins, pour l’histogramme. */
	weeklyActivity: number[];
};

/** Agrégats des 7 derniers jours, alimentant l’en-tête du journal. */
export function computeJournalStats(history: CareEvent[], now: number): JournalStats {
	const weeklyActivity = Array.from({ length: 7 }, () => 0);
	let careThisWeek = 0;
	let xpThisWeek = 0;

	for (const event of history) {
		const offset = daysBetween(event.at, now);
		if (offset < 0 || offset > 6) continue;

		careThisWeek += 1;
		xpThisWeek += event.xpEarned;
		// Index 6 = aujourd’hui, index 0 = il y a 6 jours : lecture chronologique.
		weeklyActivity[6 - offset] += 1;
	}

	return { careThisWeek, xpThisWeek, weeklyActivity };
}
