import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, XStack, YStack } from "tamagui";

import { ProgressTrack } from "@/components/ui/progress-track";
import { SectionHeader } from "@/components/ui/section-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { scrollScreenContentStyle } from "@/helpers/tamagui";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import { BadgeTile } from "@/features/garden/components/badge-tile";
import { LevelRing } from "@/features/garden/components/level-ring";
import { StreakChip } from "@/features/garden/components/streak-chip";
import type { LevelProgress } from "@/features/garden/domain/level";
import type { Badge } from "@/features/garden/types";

import { StatTile } from "../components/stat-tile";

export type ProfileStats = {
	totalCare: number;
	plantCount: number;
	badgesUnlocked: number;
	streakDays: number;
};

export type ProfileViewProps = {
	name: string;
	level: LevelProgress;
	xp: number;
	stats: ProfileStats;
	badges: Badge[];
};

/** Profil : identité + progression, chiffres clés, collection de badges. */
export function ProfileView({ name, level, xp, stats, badges }: ProfileViewProps) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }} edges={["top", "left", "right"]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scrollScreenContentStyle()}>
				<Text
					fontSize={28}
					fontWeight="800"
					fontFamily={Fonts.rounded}
					color={plantPalette.gardenText}
					marginTop="$1">
					Profil
				</Text>

				<SurfaceCard alignItems="center" gap="$3" paddingVertical="$5">
					<LevelRing level={level.level} ratio={level.ratio} size={86} />

					<YStack alignItems="center" gap="$1">
						<Text fontSize={22} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenText}>
							{name}
						</Text>
						<Text fontSize={14} fontWeight="700" color={plantPalette.iconTeal}>
							{level.title}
						</Text>
					</YStack>

					<StreakChip streakDays={stats.streakDays} variant="full" />

					<YStack width="100%" gap="$1.5" marginTop="$1">
						<XStack alignItems="center" gap="$2">
							<ProgressTrack
								value={level.ratio}
								fillColor={plantPalette.xpGold}
								trackColor={plantPalette.xpTrack}
								height={10}
							/>
						</XStack>
						<XStack justifyContent="space-between">
							<Text fontSize={12} fontWeight="700" color={plantPalette.textSubtle}>
								{xp} XP au total
							</Text>
							<Text fontSize={12} fontWeight="700" color={plantPalette.textSubtle}>
								{level.xpForNextLevel - level.xpIntoLevel} XP → niveau {level.level + 1}
							</Text>
						</XStack>
					</YStack>
				</SurfaceCard>

				<SectionHeader title="Statistiques" />
				<XStack gap="$3" flexWrap="wrap">
					<StatTile
						icon="water"
						accent={plantPalette.waterBlue}
						value={`${stats.totalCare}`}
						label="soins prodigués"
					/>
					<StatTile
						icon="leaf"
						accent={plantPalette.primaryGreen}
						value={`${stats.plantCount}`}
						label="plantes suivies"
					/>
				</XStack>

				<SectionHeader title="Badges" trailing={`${stats.badgesUnlocked}/${badges.length}`} />
				<SurfaceCard>
					<XStack flexWrap="wrap" justifyContent="space-between" rowGap="$4">
						{badges.map((badge) => (
							<BadgeTile key={badge.id} badge={badge} />
						))}
					</XStack>
				</SurfaceCard>
			</ScrollView>
		</SafeAreaView>
	);
}
