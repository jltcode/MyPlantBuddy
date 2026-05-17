import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

export type PlantMetricRowProps = {
	icon: keyof typeof Ionicons.glyphMap;
	value: number;
	fillColor: string;
};

/** Icône + barre de progression (eau ou lumière). */
export function PlantMetricRow({ icon, value, fillColor }: PlantMetricRowProps) {
	const widthPercent = Math.max(8, value * 100);
	return (
		<XStack alignItems="center" gap="$3">
			<Ionicons name={icon} size={18} color={plantPalette.iconTeal} />
			<YStack
				flex={1}
				backgroundColor={plantPalette.progressTrackBg}
				borderWidth={1.6}
				borderColor={plantPalette.cardBorder}
				borderRadius={999}
				height={19}
				overflow="hidden">
				<View
					style={{
						width: `${widthPercent}%`,
						height: "100%",
						borderRadius: 999,
						backgroundColor: fillColor,
					}}
				/>
			</YStack>
		</XStack>
	);
}
