import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

export type SectionHeaderProps = {
	title: string;
	/** Compteur ou libellé d’état aligné à droite (ex. « 2/3 »). */
	trailing?: string;
};

/** Intitulé de section, rythme commun à tous les écrans. */
export function SectionHeader({ title, trailing }: SectionHeaderProps) {
	return (
		<XStack alignItems="center" justifyContent="space-between" marginTop="$2">
			<Text fontSize={19} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenText}>
				{title}
			</Text>
			{trailing ? (
				<YStack
					backgroundColor={plantPalette.surfaceSunken}
					borderRadius={999}
					paddingHorizontal="$2.5"
					paddingVertical="$1">
					<Text fontSize={13} fontWeight="700" color={plantPalette.gardenDescription}>
						{trailing}
					</Text>
				</YStack>
			) : null}
		</XStack>
	);
}
