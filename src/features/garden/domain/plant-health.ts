import type { Plant, PlantHealth, PlantMood } from "../types";

const MS_PER_HOUR = 3_600_000;

/** Sous ce seuil de réserve d’eau, la plante réclame de l’attention. */
const THIRSTY_THRESHOLD = 0.35;
const CRITICAL_THRESHOLD = 0.12;

function moodFromWaterLevel(waterLevel: number): PlantMood {
	if (waterLevel <= CRITICAL_THRESHOLD) return "critical";
	if (waterLevel <= THIRSTY_THRESHOLD) return "thirsty";
	return "thriving";
}

/**
 * Santé dérivée du temps, jamais stockée : la réserve d’eau décroît linéairement
 * entre le dernier arrosage et l’échéance suivante. Une seule source de vérité
 * (`lastWateredAt`) évite les états incohérents.
 */
export function computePlantHealth(plant: Plant, now: number): PlantHealth {
	const elapsedHours = Math.max(0, (now - plant.lastWateredAt) / MS_PER_HOUR);
	const waterLevel = Math.min(1, Math.max(0, 1 - elapsedHours / plant.wateringIntervalHours));

	return {
		waterLevel,
		mood: moodFromWaterLevel(waterLevel),
		hoursUntilWatering: plant.wateringIntervalHours - elapsedHours,
	};
}

/** Une plante n’est arrosable que si sa réserve n’est pas déjà pleine — évite le sur-arrosage. */
export function canWater(health: PlantHealth): boolean {
	return health.waterLevel < 0.92;
}

/** Libellé court de l’échéance, pensé pour un badge de carte. */
export function formatWateringDeadline(health: PlantHealth): string {
	const hours = Math.round(health.hoursUntilWatering);

	if (hours <= 0) return `En retard de ${Math.abs(hours)} h`;
	if (hours < 24) return `Dans ${hours} h`;

	const days = Math.round(hours / 24);
	return days === 1 ? "Demain" : `Dans ${days} j`;
}

/** Nombre de plantes réclamant un soin — alimente le bandeau de synthèse et les quêtes. */
export function countPlantsNeedingCare(plants: Plant[], now: number): number {
	return plants.filter((plant) => computePlantHealth(plant, now).mood !== "thriving").length;
}
