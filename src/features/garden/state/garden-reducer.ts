import { createDailyQuests } from "../data/garden-mock";
import { evaluateBadges } from "../domain/badges";
import { hasLeveledUp, levelProgressFromXp, xpForCare } from "../domain/level";
import { canWater, computePlantHealth, countPlantsNeedingCare } from "../domain/plant-health";
import { nextStreakDays, opensNewDay } from "../domain/streak";
import type { CareEvent, GardenState, Quest } from "../types";

export type GardenAction =
	| { type: "water-plant"; plantId: string; now: number }
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
					xpGained: xpGained + questXp,
					leveledUpTo: hasLeveledUp(state.player.xp, xp) ? levelProgressFromXp(xp).level : null,
					questsCompleted: completed,
					badgesUnlocked: unlocked,
				},
			};
		}

		default:
			return state;
	}
}
