export { GardenProvider, useGarden, type GardenContextValue, type PlantWithHealth } from "./state/garden-provider";
export { levelProgressFromXp, titleForLevel, streakMultiplier, XP_REWARDS, type LevelProgress } from "./domain/level";
export { computePlantHealth, canWater, formatWateringDeadline, countPlantsNeedingCare } from "./domain/plant-health";
export { isSameDay } from "./domain/streak";
export {
	AVATAR_STAGE_STYLES,
	avatarCallToAction,
	avatarCallToActionLabel,
	avatarStageForLevel,
	type AvatarCallToAction,
	type AvatarStage,
	type AvatarStageStyle,
} from "./domain/avatar";
export type {
	Badge,
	CareAction,
	CareEvent,
	GardenState,
	Plant,
	PlantAvatar,
	PlantHealth,
	PlantMood,
	Player,
	Quest,
	RewardFeedback,
} from "./types";
