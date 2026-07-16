import { Text, XStack, YStack } from "tamagui";

import { ProgressTrack } from "@/components/ui/progress-track";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { LevelProgress } from "../domain/level";

import { LevelRing } from "./level-ring";
import { StreakChip } from "./streak-chip";

export type PlayerHeaderProps = {
	name: string;
	level: LevelProgress;
	streakDays: number;
};

/** Carte d’identité du joueur : niveau, titre, XP restante et série. */
export function PlayerHeader({ name, level, streakDays }: PlayerHeaderProps) {
	const xpRemaining = level.xpForNextLevel - level.xpIntoLevel;

	return (
		<XStack alignItems="center" gap="$3">
			<LevelRing level={level.level} ratio={level.ratio} />

			<YStack flex={1} gap="$1.5">
				<XStack alignItems="center" justifyContent="space-between" gap="$2">
					<Text
						fontSize={17}
						fontWeight="800"
						fontFamily={Fonts.rounded}
						color={plantPalette.gardenText}
						numberOfLines={1}
						flex={1}>
						{name}
					</Text>
					<StreakChip streakDays={streakDays} variant="full" />
				</XStack>

				<Text fontSize={13} fontWeight="600" color={plantPalette.textSubtle} numberOfLines={1}>
					{level.title}
				</Text>

				<XStack alignItems="center" gap="$2">
					<ProgressTrack
						value={level.ratio}
						fillColor={plantPalette.xpGold}
						trackColor={plantPalette.xpTrack}
						height={8}
					/>
					<Text fontSize={11} fontWeight="700" color={plantPalette.textSubtle}>
						{xpRemaining} XP
					</Text>
				</XStack>
			</YStack>
		</XStack>
	);
}
