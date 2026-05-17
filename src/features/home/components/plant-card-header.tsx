import { Text, XStack } from "tamagui";

import { Fonts } from "@/theme/theme";
import { plantPalette } from "@/theme/plant-palette";

import type { Plant } from "../types";

export type PlantCardHeaderProps = Pick<Plant, "name" | "warningLabel">;

export function PlantCardHeader({ name, warningLabel }: PlantCardHeaderProps) {
	return (
		<XStack alignItems="center" justifyContent="space-between" marginBottom="$3.5">
			<Text
				color={plantPalette.gardenTextDeep}
				fontSize={24}
				fontWeight="800"
				fontFamily={Fonts.rounded}
				maxWidth="70%">
				{name}
			</Text>
			{warningLabel ? (
				<Text
					backgroundColor={plantPalette.warningRed}
					color="#FFFFFF"
					fontWeight="800"
					fontSize={14}
					paddingHorizontal="$3"
					paddingVertical="$1.5"
					borderRadius={12}>
					{warningLabel}
				</Text>
			) : null}
		</XStack>
	);
}
