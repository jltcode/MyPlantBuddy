import * as Haptics from "expo-haptics";
import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";

import { createMockGarden } from "../data/garden-mock";
import { levelProgressFromXp, type LevelProgress } from "../domain/level";
import { computePlantHealth, countPlantsNeedingCare } from "../domain/plant-health";
import type { GardenState, Plant, PlantHealth } from "../types";

import { gardenReducer } from "./garden-reducer";
import { useNow } from "./use-now";

export type PlantWithHealth = Plant & { health: PlantHealth };

export type GardenContextValue = {
	state: GardenState;
	/** Horloge partagée : toutes les dérivations temporelles lisent ce `now`. */
	now: number;
	plants: PlantWithHealth[];
	level: LevelProgress;
	plantsNeedingCare: number;
	waterPlant: (plantId: string) => void;
	dismissReward: () => void;
};

const GardenContext = createContext<GardenContextValue | null>(null);

/**
 * Source de vérité du jardin, partagée par tous les onglets (accueil, journal, profil).
 * Les données sont encore mockées ; le jour où l’API Nest existe, seul l’initialiseur
 * change (TanStack Query en amont), le contrat de ce contexte reste identique.
 */
export function GardenProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(gardenReducer, undefined, () => createMockGarden(Date.now()));
	const now = useNow();

	const waterPlant = useCallback(
		(plantId: string) => {
			void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			dispatch({ type: "water-plant", plantId, now: Date.now() });
		},
		[dispatch],
	);

	const dismissReward = useCallback(() => dispatch({ type: "dismiss-reward" }), [dispatch]);

	const value = useMemo<GardenContextValue>(() => {
		const plants = state.plants.map((plant) => ({ ...plant, health: computePlantHealth(plant, now) }));

		return {
			state,
			now,
			plants,
			level: levelProgressFromXp(state.player.xp),
			plantsNeedingCare: countPlantsNeedingCare(state.plants, now),
			waterPlant,
			dismissReward,
		};
	}, [state, now, waterPlant, dismissReward]);

	return <GardenContext.Provider value={value}>{children}</GardenContext.Provider>;
}

export function useGarden(): GardenContextValue {
	const context = useContext(GardenContext);
	if (!context) throw new Error("useGarden doit être utilisé dans un <GardenProvider>.");
	return context;
}
