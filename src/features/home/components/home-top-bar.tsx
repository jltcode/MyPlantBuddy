import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

export type HomeTopBarProps = {
	/** Timestamp courant : la salutation suit l’heure réelle. */
	now: number;
	/** Nombre de plantes à soigner — alimente la pastille de notifications. */
	alertCount: number;
};

function greetingFor(now: number): string {
	const hour = new Date(now).getHours();
	if (hour < 6) return "Bonne nuit";
	if (hour < 12) return "Bonjour";
	if (hour < 18) return "Bel après-midi";
	return "Bonsoir";
}

/** Salutation contextuelle + actions rapides (ajout, notifications). */
export function HomeTopBar({ now, alertCount }: HomeTopBarProps) {
	return (
		<XStack alignItems="center" justifyContent="space-between" marginTop="$1" gap="$2">
			<YStack flex={1}>
				<Text fontSize={13} fontWeight="700" color={plantPalette.textSubtle}>
					{greetingFor(now)}
				</Text>
				<Text
					fontSize={28}
					lineHeight={34}
					fontWeight="800"
					fontFamily={Fonts.rounded}
					color={plantPalette.gardenText}>
					Mon jardin connecté
				</Text>
			</YStack>

			<XStack alignItems="center" gap="$2.5">
				<Button
					circular
					size="$3"
					chromeless
					borderWidth={2}
					borderColor={plantPalette.roundButtonBorder}
					backgroundColor={plantPalette.roundButtonBg}
					icon={<Ionicons name="add" size={20} color={plantPalette.roundButtonIcon} />}
					pressStyle={{ opacity: 0.85, scale: 0.95 }}
					accessibilityLabel="Ajouter une plante"
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
						pressStyle={{ opacity: 0.85, scale: 0.95 }}
						accessibilityLabel="Notifications"
						onPress={() => undefined}
					/>
					{alertCount > 0 ? (
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
							<Text color={plantPalette.textOnDark} fontSize={11} fontWeight="700">
								{alertCount}
							</Text>
						</YStack>
					) : null}
				</YStack>
			</XStack>
		</XStack>
	);
}
