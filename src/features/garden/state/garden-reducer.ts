import { createDailyQuests } from "../data/garden-mock";
import { avatarCallToAction } from "../domain/avatar";
import { evaluateBadges } from "../domain/badges";
import { hasLeveledUp, levelProgressFromXp, xpForCare } from "../domain/level";
import { canWater, computePlantHealth, countPlantsNeedingCare } from "../domain/plant-health";
import { nextStreakDays, opensNewDay } from "../domain/streak";
import type { CareEvent, GardenState, Quest } from "../types";

export type GardenAction =
	| { type: "water-plant"; plantId: string; now: number }
	| {
			type: "capture-avatar";
			plantId: string;
			photoUri: string;
			transformedUri: string;
			now: number;
	  }
	| { type: "dismiss-reward" };

/** Avancement des quêtes après un arrosage. `rescue-all` se lit sur l’état du jardin. */
function advanceQuests(quests: Quest[], plantsNeedingCare: number): Quest[] {
	return quests.map((quest) => {
		if (quest.id === "rescue-all") {
			return plantsNeedingCare === 0 ? { ...quest, progress: quest.target } : quest;
		}
		return { ...quest, progress: Math.min(quest.target, quest.progress + 1) };
	});
}

const isComplete = (quest: Quest): boolean => quest.progress >= quest.target;

/** Quêtes tout juste terminées — leur récompense n’est créditée qu’une fois. */
function questsJustCompleted(before: Quest[], after: Quest[]): Quest[] {
	return after.filter((quest, index) => isComplete(quest) && !isComplete(before[index]));
}

/**
 * Un seul chemin d’écriture pour tout le jardin : arroser met à jour la plante,
 * la série, les quêtes, les badges et l’XP de façon atomique. La santé des plantes
 * n’est jamais stockée — elle se dérive de `lastWateredAt` (voir `domain/plant-health`).
 */
export function gardenReducer(state: GardenState, action: GardenAction): GardenState {
	switch (action.type) {
		case "dismiss-reward":
			return state.lastReward === null ? state : { ...state, lastReward: null };

		case "water-plant": {
			const { plantId, now } = action;
			const plant = state.plants.find((candidate) => candidate.id === plantId);

			// Plante inconnue ou réserve déjà pleine : geste ignoré, pas de sur-arrosage.
			if (!plant || !canWater(computePlantHealth(plant, now))) return state;

			const streakDays = nextStreakDays(state.player.streakDays, state.player.lastActiveAt, now);
			const xpGained = xpForCare("water", { streakDays });

			const plants = state.plants.map((candidate) =>
				candidate.id === plantId ? { ...candidate, lastWateredAt: now } : candidate,
			);

			const careEvent: CareEvent = {
				id: `care-${now}-${plantId}`,
				plantId,
				plantName: plant.name,
				action: "water",
				at: now,
				xpEarned: xpGained,
			};

			const questsBefore = opensNewDay(state.player.lastActiveAt, now)
				? createDailyQuests()
				: state.player.quests;
			const quests = advanceQuests(questsBefore, countPlantsNeedingCare(plants, now));
			const completed = questsJustCompleted(questsBefore, quests);
			const questXp = completed.reduce((total, quest) => total + quest.xpReward, 0);

			const xp = state.player.xp + xpGained + questXp;

			const nextState: GardenState = {
				...state,
				plants,
				history: [careEvent, ...state.history],
				player: { ...state.player, xp, streakDays, lastActiveAt: now, quests },
				lastReward: null,
			};

			const { badges, unlocked } = evaluateBadges(nextState, now);

			return {
				...nextState,
				player: { ...nextState.player, badges },
				lastReward: {
					id: careEvent.id,
					plantName: plant.name,
					action: "water",
					xpGained: xpGained + questXp,
					leveledUpTo: hasLeveledUp(state.player.xp, xp) ? levelProgressFromXp(xp).level : null,
					questsCompleted: completed,
					badgesUnlocked: unlocked,
				},
			};
		}

		case "capture-avatar": {
			const { plantId, photoUri, transformedUri, now } = action;
			const plant = state.plants.find((candidate) => candidate.id === plantId);
			if (!plant) return state;

			// L’XP ne tombe que si l’app réclamait une photo (première fois, palier
			// franchi ou portrait trop vieux) : re-photographier en boucle ne rapporte rien.
			const rewarded = avatarCallToAction(plant.avatar, levelProgressFromXp(state.player.xp).level, now) !== null;

			const streakDays = rewarded
				? nextStreakDays(state.player.streakDays, state.player.lastActiveAt, now)
				: state.player.streakDays;
			const xpGained = rewarded ? xpForCare("photo", { streakDays }) : 0;
			const xp = state.player.xp + xpGained;

			// L’avatar mémorise le niveau atteint APRÈS le gain : il reflète la
			// progression célébrée à l’écran, pas celle d’avant la photo.
			const avatarLevel = levelProgressFromXp(xp).level;

			const plants = state.plants.map((candidate) =>
				candidate.id === plantId
					? { ...candidate, avatar: { photoUri, transformedUri, capturedAt: now, level: avatarLevel } }
					: candidate,
			);

			if (!rewarded) {
				return { ...state, plants };
			}

			const careEvent: CareEvent = {
				id: `care-${now}-${plantId}`,
				plantId,
				plantName: plant.name,
				action: "photo",
				at: now,
				xpEarned: xpGained,
			};

			const quests = opensNewDay(state.player.lastActiveAt, now)
				? createDailyQuests()
				: state.player.quests;

			const nextState: GardenState = {
				...state,
				plants,
				history: [careEvent, ...state.history],
				player: { ...state.player, xp, streakDays, lastActiveAt: now, quests },
				lastReward: null,
			};

			const { badges, unlocked } = evaluateBadges(nextState, now);

			return {
				...nextState,
				player: { ...nextState.player, badges },
				lastReward: {
					id: careEvent.id,
					plantName: plant.name,
					action: "photo",
					xpGained,
					leveledUpTo: hasLeveledUp(state.player.xp, xp) ? avatarLevel : null,
					questsCompleted: [],
					badgesUnlocked: unlocked,
				},
			};
		}

		default:
			return state;
	}
}
