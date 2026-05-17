import Ionicons from "@expo/vector-icons/Ionicons";
import { YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import type { Plant } from "../types";

export type PlantCardAvatarProps = Pick<Plant, "mood">;

export function PlantCardAvatar({ mood }: PlantCardAvatarProps) {
	return (
		<YStack
			width={106}
			height={106}
			borderRadius={53}
			backgroundColor={mood === "warning" ? plantPalette.warningAvatarBg : plantPalette.avatarLeaf}
			alignItems="center"
			justifyContent="center">
			<Ionicons name="leaf" size={38} color={plantPalette.iconTeal} />
		</YStack>
	);
}
