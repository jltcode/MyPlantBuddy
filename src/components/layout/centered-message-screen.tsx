import { Text, YStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";

import { flexCenterColumn, screenGutter } from "@/helpers/tamagui";
import { plantPalette } from "@/theme/plant-palette";

export type CenteredMessageScreenProps = {
	title: string;
	description: string;
};

/**
 * Layout partagé : fond vert clair, titre + texte centrés (écrans placeholder / onboarding).
 */
export function CenteredMessageScreen({ title, description }: CenteredMessageScreenProps) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }}>
			<YStack {...flexCenterColumn} flex={1} paddingHorizontal={screenGutter}>
				<Text fontSize={34} fontWeight="800" color={plantPalette.gardenText}>
					{title}
				</Text>
				<Text fontSize={18} color={plantPalette.gardenDescription} textAlign="center">
					{description}
				</Text>
			</YStack>
		</SafeAreaView>
	);
}
