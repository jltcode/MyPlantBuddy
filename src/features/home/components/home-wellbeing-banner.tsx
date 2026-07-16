import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

export type HomeWellbeingBannerProps = {
	plantsNeedingCare: number;
};

/** Bandeau de synthèse : une phrase, un ton, qui suivent l’état réel du jardin. */
export function HomeWellbeingBanner({ plantsNeedingCare }: HomeWellbeingBannerProps) {
	const allGood = plantsNeedingCare === 0;

	const copy = allGood
		? "Tout le jardin va bien aujourd’hui."
		: `${plantsNeedingCare} plante${plantsNeedingCare > 1 ? "s ont" : " a"} soif.`;

	return (
		<XStack
			backgroundColor={allGood ? plantPalette.statusBannerBg : plantPalette.streakSoft}
			borderRadius={18}
			paddingHorizontal="$3.5"
			paddingVertical="$3"
			alignItems="center"
			gap="$3">
			<YStack
				width={34}
				height={34}
				borderRadius={17}
				alignItems="center"
				justifyContent="center"
				backgroundColor={allGood ? plantPalette.avatarLeaf : plantPalette.surfaceElevated}>
				<Ionicons
					name={allGood ? "sunny" : "water"}
					size={18}
					color={allGood ? plantPalette.sunIcon : plantPalette.streakFlame}
				/>
			</YStack>

			<YStack flex={1}>
				<Text color={plantPalette.gardenTextMuted} fontSize={15.5} fontWeight="700" fontFamily={Fonts.rounded}>
					{copy}
				</Text>
				<Text color={plantPalette.textSubtle} fontSize={12.5} fontWeight="600">
					{allGood ? "Reviens demain pour garder ta série." : "Arrose-les pour garder ta série vivante."}
				</Text>
			</YStack>
		</XStack>
	);
}
