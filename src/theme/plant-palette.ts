/**
 * Couleurs métier WaterYouPlant — source unique pour Tamagui (`bg`, `bc`, etc.) et styles ponctuels.
 */
export const plantPalette = {
	gardenBackground: "#E8F2EC",
	gardenBlob: "#D6EAD9",
	gardenText: "#123D2D",
	gardenTextMuted: "#204836",
	gardenTextDeep: "#113C2C",
	gardenDescription: "#2A5D46",
	tabBarBg: "#0D3425",
	tabActive: "#A8DA92",
	tabInactive: "#D6EFC6",
	cardSurface: "#EAF3EE",
	cardBorder: "#447764",
	progressTrackBg: "#F4F8F5",
	primaryGreen: "#7DBE66",
	primaryGreenBorder: "#F4F9F5",
	warningRed: "#F05D4F",
	warningAvatarBg: "#ECF0DB",
	avatarLeaf: "#DCEFD8",
	iconTeal: "#4F9F86",
	waterBlue: "#43A9DB",
	sunYellow: "#F0C34E",
	sunIcon: "#E2AA31",
	badgeRed: "#F2554C",
	roundButtonBorder: "#29634A",
	roundButtonBg: "#EAF5EF",
	roundButtonIcon: "#174D38",
	statusBannerBg: "#E3EFE6",
	shadow: "#244438",

	/* — Surfaces & texte — */
	surfaceElevated: "#FFFFFF",
	surfaceSunken: "#DCEBE1",
	hairline: "#CFE2D6",
	textOnDark: "#FFFFFF",
	textSubtle: "#6B8F7E",

	/* — Gamification : XP, niveau, série — */
	xpGold: "#F2B138",
	xpGoldSoft: "#FCEBC6",
	xpTrack: "#CFE4D7",
	levelInk: "#0D3425",
	streakFlame: "#F97B3D",
	streakSoft: "#FDE3D3",

	/* — Quêtes — */
	questDone: "#7DBE66",
	questTodo: "#B7D3C3",

	/* — Badges (paliers) — */
	badgeLocked: "#C6D9CD",
	badgeBronze: "#C98A5B",
	badgeSilver: "#9BAEB6",
	badgeGold: "#EDB238",

	/* — États de santé plante — */
	moodThriving: "#5BA97F",
	moodThirsty: "#E8A33D",
	moodCritical: "#F05D4F",
} as const;

export type PlantPalette = typeof plantPalette;
