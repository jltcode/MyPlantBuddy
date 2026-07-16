import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import type { PlantMood, PlantSpecies } from "@/features/garden/types";

/** Frimousse de la plante — le lien affectif passe par là, pas par une icône neutre. */
const MOOD_FACE: Record<PlantMood, string> = {
	thriving: "◡‿◡",
	thirsty: "•︵•",
	critical: "×︵×",
};

const MOOD_RING: Record<PlantMood, string> = {
	thriving: plantPalette.moodThriving,
	thirsty: plantPalette.moodThirsty,
	critical: plantPalette.moodCritical,
};

const SPECIES_ICON: Record<PlantSpecies, keyof typeof Ionicons.glyphMap> = {
	monstera: "leaf",
	ficus: "leaf-outline",
	succulent: "flower",
	pothos: "leaf",
	calathea: "flower-outline",
};

export type PlantCardAvatarProps = {
	mood: PlantMood;
	species: PlantSpecies;
	size?: number;
};

export function PlantCardAvatar({ mood, species, size = 88 }: PlantCardAvatarProps) {
	const ring = MOOD_RING[mood];

	return (
		<YStack
			width={size}
			height={size}
			borderRadius={size / 2}
			backgroundColor={mood === "thriving" ? plantPalette.avatarLeaf : plantPalette.warningAvatarBg}
			borderWidth={2.5}
			borderColor={ring}
			alignItems="center"
			justifyContent="center"
			gap="$1">
			<Ionicons name={SPECIES_ICON[species]} size={size * 0.3} color={plantPalette.iconTeal} />
			<Text fontSize={size * 0.14} fontWeight="700" color={ring}>
				{MOOD_FACE[mood]}
			</Text>
		</YStack>
	);
}
