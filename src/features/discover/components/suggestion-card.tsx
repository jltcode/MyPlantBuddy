import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { PlantSuggestion } from "../data/discover-mock";

const DIFFICULTY_COPY: Record<PlantSuggestion["difficulty"], { label: string; color: string }> = {
	1: { label: "Facile", color: plantPalette.moodThriving },
	2: { label: "Moyenne", color: plantPalette.moodThirsty },
	3: { label: "Exigeante", color: plantPalette.moodCritical },
};

export type SuggestionCardProps = {
	suggestion: PlantSuggestion;
};

/** Suggestion de plante : difficulté, lumière et rythme d’arrosage. */
export function SuggestionCard({ suggestion }: SuggestionCardProps) {
	const difficulty = DIFFICULTY_COPY[suggestion.difficulty];

	return (
		<YStack
			flex={1}
			minWidth={150}
			gap="$2.5"
			backgroundColor={plantPalette.surfaceElevated}
			borderRadius={20}
			borderWidth={1}
			borderColor={plantPalette.hairline}
			padding="$3.5">
			<XStack alignItems="center" justifyContent="space-between">
				<YStack
					width={38}
					height={38}
					borderRadius={19}
					alignItems="center"
					justifyContent="center"
					backgroundColor={plantPalette.avatarLeaf}>
					<Ionicons name="leaf" size={19} color={plantPalette.iconTeal} />
				</YStack>
				<XStack
					backgroundColor={`${difficulty.color}22`}
					borderRadius={999}
					paddingHorizontal="$2"
					paddingVertical={3}>
					<Text fontSize={11} fontWeight="800" color={difficulty.color}>
						{difficulty.label}
					</Text>
				</XStack>
			</XStack>

			<Text fontSize={16} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenTextDeep}>
				{suggestion.name}
			</Text>

			<YStack gap="$1">
				<XStack alignItems="center" gap="$1.5">
					<Ionicons name="sunny-outline" size={13} color={plantPalette.sunIcon} />
					<Text fontSize={12} fontWeight="600" color={plantPalette.textSubtle}>
						{suggestion.light}
					</Text>
				</XStack>
				<XStack alignItems="center" gap="$1.5">
					<Ionicons name="water-outline" size={13} color={plantPalette.waterBlue} />
					<Text fontSize={12} fontWeight="600" color={plantPalette.textSubtle}>
						Tous les {suggestion.waterEvery}
					</Text>
				</XStack>
			</YStack>
		</YStack>
	);
}
