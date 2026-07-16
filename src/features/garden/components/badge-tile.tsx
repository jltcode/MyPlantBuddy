import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { Badge, BadgeId } from "../types";

const BADGE_ICONS: Record<BadgeId, keyof typeof Ionicons.glyphMap> = {
	"first-drop": "water",
	collector: "albums",
	"week-streak": "flame",
	"night-owl": "moon",
	"green-thumb": "leaf",
};

const TIER_COLORS: Record<Badge["tier"], string> = {
	bronze: plantPalette.badgeBronze,
	silver: plantPalette.badgeSilver,
	gold: plantPalette.badgeGold,
};

export type BadgeTileProps = {
	badge: Badge;
};

/** Badge unitaire : coloré une fois obtenu, grisé et cadenassé sinon. */
export function BadgeTile({ badge }: BadgeTileProps) {
	const unlocked = badge.unlockedAt !== null;
	const accent = unlocked ? TIER_COLORS[badge.tier] : plantPalette.badgeLocked;

	return (
		<YStack alignItems="center" gap="$1.5" width={92}>
			<YStack
				width={62}
				height={62}
				borderRadius={31}
				alignItems="center"
				justifyContent="center"
				backgroundColor={unlocked ? `${accent}22` : plantPalette.surfaceSunken}
				borderWidth={2}
				borderColor={accent}>
				<Ionicons
					name={unlocked ? BADGE_ICONS[badge.id] : "lock-closed"}
					size={26}
					color={accent}
				/>
			</YStack>
			<Text
				fontSize={12}
				fontWeight="700"
				fontFamily={Fonts.rounded}
				color={unlocked ? plantPalette.gardenTextDeep : plantPalette.textSubtle}
				textAlign="center"
				numberOfLines={2}>
				{badge.label}
			</Text>
		</YStack>
	);
}
