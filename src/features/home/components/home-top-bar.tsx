import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

/** Titre de page + actions rapides (ajout, notifications avec pastille). */
export function HomeTopBar() {
	return (
		<XStack alignItems="center" justifyContent="space-between" marginTop="$1.5">
			<Text
				fontSize={34}
				lineHeight={40}
				fontWeight="800"
				fontFamily={Fonts.rounded}
				color={plantPalette.gardenText}
				flex={1}
				maxWidth="74%">
				Mon jardin Connecté
			</Text>
			<XStack alignItems="center" gap="$2.5">
				<Button
					circular
					size="$3"
					chromeless
					borderWidth={2}
					borderColor={plantPalette.roundButtonBorder}
					backgroundColor={plantPalette.roundButtonBg}
					icon={<Ionicons name="add" size={20} color={plantPalette.roundButtonIcon} />}
					pressStyle={{ opacity: 0.85 }}
					onPress={() => undefined}
				/>
				<YStack position="relative">
					<Button
						circular
						size="$3"
						chromeless
						borderWidth={2}
						borderColor={plantPalette.roundButtonBorder}
						backgroundColor={plantPalette.roundButtonBg}
						icon={<Ionicons name="notifications" size={18} color={plantPalette.roundButtonIcon} />}
						pressStyle={{ opacity: 0.85 }}
						onPress={() => undefined}
					/>
					<YStack
						pointerEvents="none"
						position="absolute"
						top={-4}
						right={-5}
						minWidth={18}
						height={18}
						borderRadius={9}
						backgroundColor={plantPalette.badgeRed}
						alignItems="center"
						justifyContent="center"
						paddingHorizontal={4}>
						<Text color="#FFFFFF" fontSize={11} fontWeight="700">
							2
						</Text>
					</YStack>
				</YStack>
			</XStack>
		</XStack>
	);
}
