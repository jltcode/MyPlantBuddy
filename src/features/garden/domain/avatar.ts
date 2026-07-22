import { plantPalette } from "@/theme/plant-palette";

import type { PlantAvatar } from "../types";

/**
 * Paliers visuels de l’avatar, dérivés du niveau du joueur. L’avatar « grandit »
 * avec la progression : chaque palier ajoute une aura plus riche autour de la photo.
 * Le futur backend IA recevra ce palier pour styliser l’image générée.
 */
export type AvatarStage = "sprout" | "bloom" | "radiant" | "mythic";

/** Niveau minimal de chaque palier, du plus prestigieux au plus modeste. */
const STAGE_THRESHOLDS: readonly (readonly [AvatarStage, number])[] = [
	["mythic", 10],
	["radiant", 7],
	["bloom", 4],
	["sprout", 1],
];

export function avatarStageForLevel(level: number): AvatarStage {
	const match = STAGE_THRESHOLDS.find(([, minLevel]) => level >= minLevel);
	return match ? match[0] : "sprout";
}

export type AvatarStageStyle = {
	label: string;
	description: string;
	/** Anneau principal autour de l’avatar. */
	auraColor: string;
	/** Halo externe — plus visible sur les hauts paliers. */
	glowColor: string;
	/** Nombre d’étincelles décoratives (0 = aucune). */
	sparkles: number;
};

export const AVATAR_STAGE_STYLES: Record<AvatarStage, AvatarStageStyle> = {
	sprout: {
		label: "Jeune pousse",
		description: "L’avatar vient d’éclore, tout doux, tout vert.",
		auraColor: plantPalette.primaryGreen,
		glowColor: plantPalette.avatarLeaf,
		sparkles: 0,
	},
	bloom: {
		label: "En fleur",
		description: "L’avatar s’épanouit et attire les regards.",
		auraColor: plantPalette.iconTeal,
		glowColor: plantPalette.surfaceSunken,
		sparkles: 1,
	},
	radiant: {
		label: "Rayonnant",
		description: "Une aura dorée entoure l’avatar.",
		auraColor: plantPalette.xpGold,
		glowColor: plantPalette.xpGoldSoft,
		sparkles: 2,
	},
	mythic: {
		label: "Mythique",
		description: "L’avatar irradie — le jardin entier le contemple.",
		auraColor: plantPalette.streakFlame,
		glowColor: plantPalette.streakSoft,
		sparkles: 3,
	},
};

/** Au-delà de cet âge, la vraie plante a probablement changé : on invite à re-photographier. */
export const AVATAR_MAX_AGE_MS = 7 * 24 * 3_600_000;

/**
 * Raison pour laquelle on réclame une (nouvelle) photo, `null` si l’avatar est à jour.
 * C’est le moteur de l’interaction : l’app demande une vraie action (photographier
 * sa plante) pour laisser l’avatar évoluer.
 */
export type AvatarCallToAction = "first-photo" | "level-up" | "refresh";

export function avatarCallToAction(
	avatar: PlantAvatar | null,
	level: number,
	now: number,
): AvatarCallToAction | null {
	if (!avatar) return "first-photo";
	if (avatarStageForLevel(level) !== avatarStageForLevel(avatar.level)) return "level-up";
	if (now - avatar.capturedAt > AVATAR_MAX_AGE_MS) return "refresh";
	return null;
}

/** Message court affiché près de l’avatar pour motiver la prise de photo. */
export function avatarCallToActionLabel(cta: AvatarCallToAction): string {
	switch (cta) {
		case "first-photo":
			return "Prends sa première photo !";
		case "level-up":
			return "Palier franchi — fais évoluer son avatar !";
		case "refresh":
			return "Ta plante a changé, mets à jour son portrait.";
	}
}
