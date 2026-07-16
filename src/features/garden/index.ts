export { GardenProvider, useGarden, type GardenContextValue, type PlantWithHealth } from "./state/garden-provider";
export { levelProgressFromXp, titleForLevel, streakMultiplier, XP_REWARDS, type LevelProgress } from "./domain/level";
export { computePlantHealth, canWater, formatWateringDeadline, countPlantsNeedingCare } from "./domain/plant-health";
export { isSameDay } from "./domain/streak";
export type {
	Badge,
	CareAction,
	CareEvent,
	GardenState,
	Plant,
	PlantHealth,
	PlantMood,
	Player,
	Quest,
	RewardFeedback,
} from "./types";
