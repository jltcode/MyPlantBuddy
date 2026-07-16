import { Text, XStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import type { PlantMood } from "@/features/garden/types";

const MOOD_COPY: Record<PlantMood, { label: string; color: string }> = {
	thriving: { label: "En forme", color: plantPalette.moodThriving },
	thirsty: { label: "Assoiffée", color: plantPalette.moodThirsty },
	critical: { label: "SOS Eau !", color: plantPalette.moodCritical },
};

export type PlantMoodBadgeProps = {
	mood: PlantMood;
};

/** Pastille d’état, lisible d’un coup d’œil dans la liste. */
export function PlantMoodBadge({ mood }: PlantMoodBadgeProps) {
	const { label, color } = MOOD_COPY[mood];

	return (
		<XStack backgroundColor={color} borderRadius={999} paddingHorizontal="$2.5" paddingVertical="$1">
			<Text color={plantPalette.textOnDark} fontSize={12} fontWeight="800">
				{label}
			</Text>
		</XStack>
	);
}
