import { Button, Text } from "tamagui";

import { Fonts } from "@/theme/theme";
import { plantPalette } from "@/theme/plant-palette";

export type PlantCardCtaProps = {
	label: string;
};

/** CTA principal de la carte (ex. « Arroser ») — affiché uniquement si le parent décide de le montrer. */
export function PlantCardCta({ label }: PlantCardCtaProps) {
	return (
		<Button
			unstyled
			marginTop="$4"
			backgroundColor={plantPalette.primaryGreen}
			borderRadius={999}
			borderWidth={4}
			borderColor={plantPalette.primaryGreenBorder}
			minHeight={58}
			alignItems="center"
			justifyContent="center"
			paddingHorizontal="$4"
			paddingVertical="$3"
			pressStyle={{ opacity: 0.92 }}>
			<Text color="#FFFFFF" fontSize={22} lineHeight={28} fontWeight="800" fontFamily={Fonts.rounded}>
				{label}
			</Text>
		</Button>
	);
}
