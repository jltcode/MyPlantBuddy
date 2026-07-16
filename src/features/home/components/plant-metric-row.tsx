import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack } from "tamagui";

import { ProgressTrack } from "@/components/ui/progress-track";
import { plantPalette } from "@/theme/plant-palette";

export type PlantMetricRowProps = {
	icon: keyof typeof Ionicons.glyphMap;
	value: number;
	fillColor: string;
};

/** Icône + jauge + pourcentage (eau ou lumière). */
export function PlantMetricRow({ icon, value, fillColor }: PlantMetricRowProps) {
	return (
		<XStack alignItems="center" gap="$2.5">
			<Ionicons name={icon} size={17} color={fillColor} />
			<ProgressTrack
				value={value}
				fillColor={fillColor}
				trackColor={plantPalette.surfaceSunken}
				height={10}
			/>
			<Text fontSize={12} fontWeight="700" color={plantPalette.textSubtle} width={34} textAlign="right">
				{Math.round(value * 100)} %
			</Text>
		</XStack>
	);
}
