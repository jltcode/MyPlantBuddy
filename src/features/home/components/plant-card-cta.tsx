import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text, XStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

export type PlantCardCtaProps = {
	/** `false` quand la réserve est encore pleine — on n’arrose pas deux fois. */
	enabled: boolean;
	xpReward: number;
	onPress: () => void;
};

/**
 * CTA d’arrosage. Désactivé, il explique pourquoi plutôt que de disparaître :
 * l’utilisateur comprend l’état de la plante au lieu de chercher le bouton.
 */
export function PlantCardCta({ enabled, xpReward, onPress }: PlantCardCtaProps) {
	if (!enabled) {
		return (
			<XStack
				marginTop="$3.5"
				backgroundColor={plantPalette.surfaceSunken}
				borderRadius={999}
				minHeight={48}
				alignItems="center"
				justifyContent="center"
				gap="$2">
				<Ionicons name="checkmark-circle" size={18} color={plantPalette.moodThriving} />
				<Text fontSize={15} fontWeight="700" fontFamily={Fonts.rounded} color={plantPalette.gardenDescription}>
					Réserve pleine
				</Text>
			</XStack>
		);
	}

	return (
		<Button
			unstyled
			marginTop="$3.5"
			backgroundColor={plantPalette.primaryGreen}
			borderRadius={999}
			minHeight={52}
			alignItems="center"
			justifyContent="center"
			flexDirection="row"
			gap="$2"
			paddingHorizontal="$4"
			pressStyle={{ opacity: 0.9, scale: 0.97 }}
			accessibilityRole="button"
			onPress={onPress}>
			<Ionicons name="water" size={19} color={plantPalette.textOnDark} />
			<Text fontSize={17} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.textOnDark}>
				Arroser
			</Text>
			<XStack backgroundColor="#00000022" borderRadius={999} paddingHorizontal="$2" paddingVertical={2}>
				<Text fontSize={12} fontWeight="800" color={plantPalette.textOnDark}>
					+{xpReward} XP
				</Text>
			</XStack>
		</Button>
	);
}
