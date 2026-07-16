import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import { streakMultiplier } from "../domain/level";

export type StreakChipProps = {
	streakDays: number;
	/** `full` affiche le bonus d’XP en plus du compteur de jours. */
	variant?: "compact" | "full";
};

/** Compteur de série + bonus d’XP associé — le carburant du retour quotidien. */
export function StreakChip({ streakDays, variant = "compact" }: StreakChipProps) {
	const bonusPercent = Math.round((streakMultiplier(streakDays) - 1) * 100);

	return (
		<XStack
			alignItems="center"
			gap="$1.5"
			backgroundColor={plantPalette.streakSoft}
			borderRadius={999}
			paddingHorizontal="$2.5"
			paddingVertical="$1.5">
			<Ionicons name="flame" size={16} color={plantPalette.streakFlame} />
			<Text fontSize={14} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.streakFlame}>
				{streakDays} j
			</Text>
			{variant === "full" && bonusPercent > 0 ? (
				<Text fontSize={12} fontWeight="700" color={plantPalette.streakFlame} opacity={0.8}>
					+{bonusPercent} % XP
				</Text>
			) : null}
		</XStack>
	);
}
