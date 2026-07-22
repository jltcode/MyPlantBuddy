import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import { formatWateringDeadline } from "@/features/garden/domain/plant-health";
import type { PlantAvatar, PlantHealth, PlantSpecies } from "@/features/garden/types";

import { PlantCardAvatar } from "./plant-card-avatar";
import { PlantMetricRow } from "./plant-metric-row";

export type PlantCardBodyProps = {
	health: PlantHealth;
	lightLevel: number;
	species: PlantSpecies;
	avatar: PlantAvatar | null;
	level: number;
	now: number;
	onPressAvatar: () => void;
};

/** Rangée centrale : jauges + échéance à gauche, avatar à droite. */
export function PlantCardBody({
	health,
	lightLevel,
	species,
	avatar,
	level,
	now,
	onPressAvatar,
}: PlantCardBodyProps) {
	const late = health.hoursUntilWatering <= 0;

	return (
		<XStack alignItems="center" justifyContent="space-between" gap="$3.5">
			<YStack flex={1} gap="$2.5">
				<PlantMetricRow icon="water" value={health.waterLevel} fillColor={plantPalette.waterBlue} />
				<PlantMetricRow icon="sunny" value={lightLevel} fillColor={plantPalette.sunYellow} />

				<XStack alignItems="center" gap="$1.5">
					<Ionicons
						name={late ? "alert-circle" : "time-outline"}
						size={14}
						color={late ? plantPalette.moodCritical : plantPalette.textSubtle}
					/>
					<Text
						fontSize={12.5}
						fontWeight="700"
						color={late ? plantPalette.moodCritical : plantPalette.textSubtle}>
						{late ? formatWateringDeadline(health) : `Arrosage ${formatWateringDeadline(health).toLowerCase()}`}
					</Text>
				</XStack>
			</YStack>

			<PlantCardAvatar
				mood={health.mood}
				species={species}
				avatar={avatar}
				level={level}
				now={now}
				onPress={onPressAvatar}
			/>
		</XStack>
	);
}
