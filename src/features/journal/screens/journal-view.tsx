import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, YStack } from "tamagui";

import { SectionHeader } from "@/components/ui/section-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { scrollScreenContentStyle } from "@/helpers/tamagui";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import { StreakChip } from "@/features/garden/components/streak-chip";

import { CareEventRow } from "../components/care-event-row";
import { WeeklyActivityChart } from "../components/weekly-activity-chart";
import type { CareEventGroup, JournalStats } from "../domain/group-care-events";

export type JournalViewProps = {
	groups: CareEventGroup[];
	stats: JournalStats;
	streakDays: number;
	now: number;
};

function JournalEmptyState() {
	return (
		<SurfaceCard alignItems="center" gap="$2" paddingVertical="$6">
			<Ionicons name="book-outline" size={30} color={plantPalette.textSubtle} />
			<Text fontSize={16} fontWeight="700" fontFamily={Fonts.rounded} color={plantPalette.gardenTextDeep}>
				Aucun soin pour l’instant
			</Text>
			<Text fontSize={13} fontWeight="600" color={plantPalette.textSubtle} textAlign="center">
				Arrose une plante depuis l’accueil : elle apparaîtra ici.
			</Text>
		</SurfaceCard>
	);
}

/** Journal : synthèse hebdomadaire puis timeline des soins groupée par jour. */
export function JournalView({ groups, stats, streakDays, now }: JournalViewProps) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }} edges={["top", "left", "right"]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scrollScreenContentStyle()}>
				<YStack gap="$1" marginTop="$1">
					<Text fontSize={28} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenText}>
						Journal
					</Text>
					<YStack alignSelf="flex-start" marginTop="$1">
						<StreakChip streakDays={streakDays} variant="full" />
					</YStack>
				</YStack>

				<WeeklyActivityChart
					weeklyActivity={stats.weeklyActivity}
					careThisWeek={stats.careThisWeek}
					xpThisWeek={stats.xpThisWeek}
					now={now}
				/>

				<SectionHeader title="Historique" />

				{groups.length === 0 ? (
					<JournalEmptyState />
				) : (
					groups.map((group) => (
						<YStack key={group.dayOffset} gap="$2.5">
							<Text fontSize={13} fontWeight="800" color={plantPalette.textSubtle} textTransform="uppercase">
								{group.label}
							</Text>
							<SurfaceCard elevation="flat">
								{group.events.map((event, index) => (
									<CareEventRow key={event.id} event={event} isLast={index === group.events.length - 1} />
								))}
							</SurfaceCard>
						</YStack>
					))
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
