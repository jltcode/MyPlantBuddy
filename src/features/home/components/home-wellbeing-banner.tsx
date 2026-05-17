import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack } from "tamagui";

import { Fonts } from "@/theme/theme";
import { plantPalette } from "@/theme/plant-palette";

/** Bandeau de synthèse « tout va bien » sous le header. */
export function HomeWellbeingBanner() {
	return (
		<XStack
			backgroundColor={plantPalette.statusBannerBg}
			borderRadius={18}
			paddingHorizontal="$3.5"
			paddingVertical="$3.5"
			alignItems="center"
			gap="$2.5">
			<Ionicons name="sunny" size={18} color={plantPalette.sunIcon} />
			<Text color={plantPalette.gardenTextMuted} fontSize={17} fontWeight="600" fontFamily={Fonts.sans} flex={1}>
				Toutes vos plantes vont bien aujourd&apos;hui.
			</Text>
		</XStack>
	);
}
