import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { ProgressTrack } from "@/components/ui/progress-track";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { Quest } from "../types";

export type QuestRowProps = {
	quest: Quest;
};

/** Une quête du jour : état, avancement et récompense. */
export function QuestRow({ quest }: QuestRowProps) {
	const done = quest.progress >= quest.target;
	const ratio = quest.target === 0 ? 1 : quest.progress / quest.target;

	return (
		<XStack alignItems="center" gap="$3" opacity={done ? 0.72 : 1}>
			<YStack
				width={30}
				height={30}
				borderRadius={15}
				alignItems="center"
				justifyContent="center"
				backgroundColor={done ? plantPalette.questDone : "transparent"}
				borderWidth={done ? 0 : 2}
				borderColor={plantPalette.questTodo}>
				{done ? <Ionicons name="checkmark" size={17} color={plantPalette.textOnDark} /> : null}
			</YStack>

			<YStack flex={1} gap="$1.5">
				<Text
					fontSize={15}
					fontWeight="700"
					fontFamily={Fonts.rounded}
					color={plantPalette.gardenTextDeep}
					textDecorationLine={done ? "line-through" : "none"}>
					{quest.label}
				</Text>

				{done ? (
					<Text fontSize={12} fontWeight="600" color={plantPalette.textSubtle}>
						{quest.hint}
					</Text>
				) : (
					<XStack alignItems="center" gap="$2">
						<ProgressTrack
							value={ratio}
							fillColor={plantPalette.primaryGreen}
							trackColor={plantPalette.surfaceSunken}
							height={6}
							minVisibleRatio={0}
						/>
						<Text fontSize={11} fontWeight="700" color={plantPalette.textSubtle}>
							{quest.progress}/{quest.target}
						</Text>
					</XStack>
				)}
			</YStack>

			<XStack
				alignItems="center"
				gap="$1"
				backgroundColor={done ? plantPalette.surfaceSunken : plantPalette.xpGoldSoft}
				borderRadius={999}
				paddingHorizontal="$2"
				paddingVertical="$1">
				<Text
					fontSize={12}
					fontWeight="800"
					color={done ? plantPalette.textSubtle : plantPalette.sunIcon}>
					+{quest.xpReward}
				</Text>
			</XStack>
		</XStack>
	);
}
