import { SurfaceCard } from "@/components/ui/surface-card";
import { plantPalette } from "@/theme/plant-palette";

import { canWater } from "@/features/garden/domain/plant-health";
import type { PlantWithHealth } from "@/features/garden/state/garden-provider";

import { PlantCardBody } from "./plant-card-body";
import { PlantCardCta } from "./plant-card-cta";
import { PlantCardHeader } from "./plant-card-header";

export type PlantCardProps = {
	plant: PlantWithHealth;
	xpReward: number;
	onWater: (plantId: string) => void;
};

/** Carte plante : en-tête, jauges + avatar, action d’arrosage. */
export function PlantCard({ plant, xpReward, onWater }: PlantCardProps) {
	const needsCare = plant.health.mood !== "thriving";

	return (
		<SurfaceCard
			gap="$3"
			// Le liseré ne s’allume que sur les plantes qui réclament un geste :
			// l’attention doit se porter là, pas sur tout le jardin.
			borderColor={needsCare ? plantPalette.moodThirsty : plantPalette.hairline}
			borderWidth={needsCare ? 1.5 : 1}>
			<PlantCardHeader name={plant.name} room={plant.room} mood={plant.health.mood} />
			<PlantCardBody health={plant.health} lightLevel={plant.lightLevel} species={plant.species} />
			<PlantCardCta
				enabled={canWater(plant.health)}
				xpReward={xpReward}
				onPress={() => onWater(plant.id)}
			/>
		</SurfaceCard>
	);
}
