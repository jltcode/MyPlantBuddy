import { YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import { PlantCardBody } from "./plant-card-body";
import { PlantCardCta } from "./plant-card-cta";
import { PlantCardHeader } from "./plant-card-header";

import type { Plant } from "../types";

export type PlantCardProps = {
	plant: Plant;
	featured?: boolean;
};

/** Carte plante : en-tête, corps (métriques + avatar), CTA optionnel. */
export function PlantCard({ plant, featured }: PlantCardProps) {
	const showCta = Boolean(featured && plant.ctaLabel);

	return (
		<YStack
			backgroundColor={plantPalette.cardSurface}
			borderRadius={24}
			padding="$4"
			shadowColor={plantPalette.shadow}
			shadowOpacity={0.1}
			shadowRadius={18}
			shadowOffset={{ width: 0, height: 10 }}
			elevation={5}>
			<PlantCardHeader name={plant.name} warningLabel={plant.warningLabel} />
			<PlantCardBody waterLevel={plant.waterLevel} lightLevel={plant.lightLevel} mood={plant.mood} />
			{showCta && plant.ctaLabel ? <PlantCardCta label={plant.ctaLabel} /> : null}
		</YStack>
	);
}
