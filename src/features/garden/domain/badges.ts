import type { Badge, BadgeId, GardenState } from "../types";

import { levelProgressFromXp } from "./level";

type BadgeContext = {
	state: GardenState;
	now: number;
};

/** Conditions de déblocage, une par badge — ajouter un badge = ajouter une ligne ici. */
const BADGE_RULES: Record<BadgeId, (context: BadgeContext) => boolean> = {
	"first-drop": ({ state }) => state.history.some((event) => event.action === "water"),
	collector: ({ state }) => state.plants.length >= 5,
	"week-streak": ({ state }) => state.player.streakDays >= 7,
	"night-owl": ({ now }) => new Date(now).getHours() >= 22,
	"green-thumb": ({ state }) => levelProgressFromXp(state.player.xp).level >= 5,
};

export type BadgeEvaluation = {
	badges: Badge[];
	/** Badges franchis lors de cette évaluation — sert à célébrer, pas à persister. */
	unlocked: Badge[];
};

/**
 * Évalue les badges verrouillés contre l’état courant. Un badge déjà obtenu ne se
 * reperd jamais : on ne rejoue les règles que sur les badges encore fermés.
 */
export function evaluateBadges(state: GardenState, now: number): BadgeEvaluation {
	const unlocked: Badge[] = [];

	const badges = state.player.badges.map((badge) => {
		if (badge.unlockedAt !== null) return badge;
		if (!BADGE_RULES[badge.id]({ state, now })) return badge;

		const earned: Badge = { ...badge, unlockedAt: now };
		unlocked.push(earned);
		return earned;
	});

	return { badges, unlocked };
}
