import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { PlantMood } from "@/features/garden/types";

import { PlantMoodBadge } from "./plant-mood-badge";

export type PlantCardHeaderProps = {
	name: string;
	room: string;
	mood: PlantMood;
};

export function PlantCardHeader({ name, room, mood }: PlantCardHeaderProps) {
	return (
		<XStack alignItems="flex-start" justifyContent="space-between" gap="$2">
			<YStack flex={1} gap="$1">
				<Text
					color={plantPalette.gardenTextDeep}
					fontSize={21}
					fontWeight="800"
					fontFamily={Fonts.rounded}
					numberOfLines={1}>
					{name}
				</Text>
				<XStack alignItems="center" gap="$1">
					<Ionicons name="location-outline" size={13} color={plantPalette.textSubtle} />
					<Text fontSize={13} fontWeight="600" color={plantPalette.textSubtle}>
						{room}
					</Text>
				</XStack>
			</YStack>
			<PlantMoodBadge mood={mood} />
		</XStack>
	);
}
