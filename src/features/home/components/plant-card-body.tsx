import { XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import { PlantCardAvatar } from "./plant-card-avatar";
import { PlantMetricRow } from "./plant-metric-row";

import type { Plant } from "../types";

export type PlantCardBodyProps = Pick<Plant, "waterLevel" | "lightLevel" | "mood">;

/** Rangée centrale : indicateurs à gauche, avatar à droite. */
export function PlantCardBody({ waterLevel, lightLevel, mood }: PlantCardBodyProps) {
	return (
		<XStack alignItems="center" justifyContent="space-between" gap="$4">
			<YStack flex={1} gap="$3">
				<PlantMetricRow icon="water-outline" value={waterLevel} fillColor={plantPalette.waterBlue} />
				<PlantMetricRow icon="sunny-outline" value={lightLevel} fillColor={plantPalette.sunYellow} />
			</YStack>
			<PlantCardAvatar mood={mood} />
		</XStack>
	);
}
