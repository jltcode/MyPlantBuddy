import type { Badge, CareEvent, GardenState, Plant, Quest } from "../types";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

/**
 * Jeu de données de démonstration, construit relativement à `now` pour que les plantes
 * présentent toujours des états de santé variés au lancement. À remplacer par
 * `lib/http` + TanStack Query quand l’API Nest exposera `/garden`.
 */
export function createMockGarden(now: number): GardenState {
	const plants: Plant[] = [
		{
			id: "monstera",
			name: "Monstera",
			species: "monstera",
			room: "Salon",
			lightLevel: 0.55,
			wateringIntervalHours: 7 * 24,
			lastWateredAt: now - 6.6 * DAY,
		},
		{
			id: "ficus",
			name: "Ficus",
			species: "ficus",
			room: "Bureau",
			lightLevel: 0.5,
			wateringIntervalHours: 6 * 24,
			lastWateredAt: now - 2.3 * DAY,
		},
		{
			id: "calathea",
			name: "Calathea",
			species: "calathea",
			room: "Chambre",
			lightLevel: 0.3,
			wateringIntervalHours: 4 * 24,
			lastWateredAt: now - 3.4 * DAY,
		},
		{
			id: "succulente",
			name: "Succulente",
			species: "succulent",
			room: "Cuisine",
			lightLevel: 0.85,
			wateringIntervalHours: 21 * 24,
			lastWateredAt: now - 4 * DAY,
		},
	];

	const history: CareEvent[] = [
		{ id: "h1", plantId: "ficus", plantName: "Ficus", action: "water", at: now - 2.3 * DAY, xpEarned: 18 },
		{ id: "h2", plantId: "succulente", plantName: "Succulente", action: "water", at: now - 4 * DAY, xpEarned: 15 },
		{ id: "h3", plantId: "calathea", plantName: "Calathea", action: "repot", at: now - 5 * DAY, xpEarned: 44 },
		{ id: "h4", plantId: "monstera", plantName: "Monstera", action: "light", at: now - 6.5 * DAY, xpEarned: 8 },
	];

	return {
		player: {
			name: "Jean-Luc",
			xp: 265,
			streakDays: 4,
			lastActiveAt: now - 20 * HOUR,
			quests: createDailyQuests(),
			badges: createBadges(now),
		},
		plants,
		history,
		lastReward: null,
	};
}

/** Quêtes du jour — remises à zéro à chaque nouvelle journée active. */
export function createDailyQuests(): Quest[] {
	return [
		{
			id: "water-one",
			label: "Premier arrosage du jour",
			hint: "Arrose une plante, n’importe laquelle.",
			xpReward: 20,
			target: 1,
			progress: 0,
		},
		{
			id: "water-three",
			label: "Tournée du jardinier",
			hint: "Arrose 3 plantes dans la journée.",
			xpReward: 45,
			target: 3,
			progress: 0,
		},
		{
			id: "rescue-all",
			label: "Zéro plante assoiffée",
			hint: "Ramène tout le jardin au vert.",
			xpReward: 60,
			target: 1,
			progress: 0,
		},
	];
}

function createBadges(now: number): Badge[] {
	return [
		{
			id: "first-drop",
			label: "Première goutte",
			description: "Arroser une plante pour la première fois.",
			tier: "bronze",
			unlockedAt: now - 30 * DAY,
		},
		{
			id: "collector",
			label: "Collectionneur",
			description: "Suivre 5 plantes dans ton jardin.",
			tier: "silver",
			unlockedAt: null,
		},
		{
			id: "week-streak",
			label: "Semaine parfaite",
			description: "Tenir une série de 7 jours d’affilée.",
			tier: "silver",
			unlockedAt: null,
		},
		{
			id: "night-owl",
			label: "Jardinier nocturne",
			description: "Prendre soin d’une plante après 22 h.",
			tier: "bronze",
			unlockedAt: null,
		},
		{
			id: "green-thumb",
			label: "Main verte",
			description: "Atteindre le niveau 5.",
			tier: "gold",
			unlockedAt: null,
		},
	];
}
