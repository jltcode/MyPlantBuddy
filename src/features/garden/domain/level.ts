import type { Player } from "../types";

/**
 * Courbe de progression : passer du niveau L au niveau L+1 coûte `L * XP_PER_LEVEL_STEP`.
 * Le coût croît linéairement, donc l’XP cumulée croît quadratiquement — assez lent pour
 * que les hauts niveaux restent désirables, assez rapide pour récompenser les débuts.
 */
const XP_PER_LEVEL_STEP = 60;

/** XP cumulée nécessaire pour atteindre `level` (niveau 1 = 0 XP). */
export function totalXpForLevel(level: number): number {
	const steps = Math.max(0, level - 1);
	return (XP_PER_LEVEL_STEP * steps * (steps + 1)) / 2;
}

export type LevelProgress = {
	level: number;
	title: string;
	/** XP accumulée à l’intérieur du niveau courant. */
	xpIntoLevel: number;
	/** XP totale que réclame le niveau courant pour passer au suivant. */
	xpForNextLevel: number;
	/** Avancement dans le niveau courant, 0 → 1. */
	ratio: number;
};

const LEVEL_TITLES = [
	"Graine curieuse",
	"Pousse prometteuse",
	"Jardinier du dimanche",
	"Main verte",
	"Botaniste amateur",
	"Gardien de la canopée",
	"Maître du jardin",
] as const;

/** Titre affiché à côté du niveau — plafonne sur le dernier palier. */
export function titleForLevel(level: number): string {
	const index = Math.min(LEVEL_TITLES.length - 1, Math.floor((level - 1) / 3));
	return LEVEL_TITLES[index];
}

/** Décompose une XP brute en niveau + avancement dans ce niveau. */
export function levelProgressFromXp(xp: number): LevelProgress {
	const safeXp = Math.max(0, xp);

	let level = 1;
	while (safeXp >= totalXpForLevel(level + 1)) {
		level += 1;
	}

	const xpIntoLevel = safeXp - totalXpForLevel(level);
	const xpForNextLevel = totalXpForLevel(level + 1) - totalXpForLevel(level);

	return {
		level,
		title: titleForLevel(level),
		xpIntoLevel,
		xpForNextLevel,
		ratio: xpForNextLevel === 0 ? 1 : xpIntoLevel / xpForNextLevel,
	};
}

/** Vrai quand un gain d’XP fait franchir un palier — déclenche la célébration. */
export function hasLeveledUp(previousXp: number, nextXp: number): boolean {
	return levelProgressFromXp(nextXp).level > levelProgressFromXp(previousXp).level;
}

/** Récompense d’XP par type de soin. */
export const XP_REWARDS = {
	water: 15,
	light: 8,
	repot: 40,
	diagnose: 10,
} as const;

/** Bonus de série : +10 % d’XP par jour consécutif, plafonné à +50 %. */
export function streakMultiplier(streakDays: number): number {
	return 1 + Math.min(0.5, Math.max(0, streakDays - 1) * 0.1);
}

/** XP réellement créditée pour un soin, bonus de série inclus. */
export function xpForCare(action: keyof typeof XP_REWARDS, player: Pick<Player, "streakDays">): number {
	return Math.round(XP_REWARDS[action] * streakMultiplier(player.streakDays));
}
