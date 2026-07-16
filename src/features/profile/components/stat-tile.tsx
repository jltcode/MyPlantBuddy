import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

export type StatTileProps = {
	icon: keyof typeof Ionicons.glyphMap;
	accent: string;
	value: string;
	label: string;
};

/** Chiffre clé du profil : icône colorée, valeur, libellé. */
export function StatTile({ icon, accent, value, label }: StatTileProps) {
	return (
		<YStack
			flex={1}
			minWidth={140}
			gap="$2"
			backgroundColor={plantPalette.surfaceElevated}
			borderRadius={20}
			borderWidth={1}
			borderColor={plantPalette.hairline}
			padding="$3.5">
			<XStack
				width={32}
				height={32}
				borderRadius={16}
				alignItems="center"
				justifyContent="center"
				backgroundColor={`${accent}22`}>
				<Ionicons name={icon} size={17} color={accent} />
			</XStack>
			<Text fontSize={22} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenText}>
				{value}
			</Text>
			<Text fontSize={12.5} fontWeight="600" color={plantPalette.textSubtle}>
				{label}
			</Text>
		</YStack>
	);
}
