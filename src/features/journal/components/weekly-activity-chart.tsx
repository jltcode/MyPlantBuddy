import { Text, XStack, YStack } from "tamagui";

import { SurfaceCard } from "@/components/ui/surface-card";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

const MAX_BAR_HEIGHT = 56;

export type WeeklyActivityChartProps = {
	/** 7 valeurs, index 6 = aujourd’hui. */
	weeklyActivity: number[];
	careThisWeek: number;
	xpThisWeek: number;
	now: number;
};

const DAY_INITIALS = ["D", "L", "M", "M", "J", "V", "S"];

/** Histogramme des soins sur 7 jours + deux chiffres clés. */
export function WeeklyActivityChart({ weeklyActivity, careThisWeek, xpThisWeek, now }: WeeklyActivityChartProps) {
	const peak = Math.max(1, ...weeklyActivity);
	const todayWeekday = new Date(now).getDay();

	return (
		<SurfaceCard gap="$4">
			<XStack justifyContent="space-between" gap="$3">
				<YStack>
					<Text fontSize={24} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenText}>
						{careThisWeek}
					</Text>
					<Text fontSize={12.5} fontWeight="600" color={plantPalette.textSubtle}>
						soins cette semaine
					</Text>
				</YStack>
				<YStack alignItems="flex-end">
					<Text fontSize={24} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.sunIcon}>
						+{xpThisWeek}
					</Text>
					<Text fontSize={12.5} fontWeight="600" color={plantPalette.textSubtle}>
						XP gagnée
					</Text>
				</YStack>
			</XStack>

			<XStack justifyContent="space-between" alignItems="flex-end" height={MAX_BAR_HEIGHT + 22}>
				{weeklyActivity.map((count, index) => {
					const isToday = index === 6;
					// index 6 = aujourd’hui : on remonte le calendrier vers la gauche.
					const weekday = (todayWeekday - (6 - index) + 7) % 7;

					return (
						<YStack key={weekday + index} alignItems="center" gap="$1.5" flex={1}>
							<YStack
								width={22}
								height={Math.max(4, (count / peak) * MAX_BAR_HEIGHT)}
								borderRadius={8}
								backgroundColor={
									count === 0
										? plantPalette.surfaceSunken
										: isToday
											? plantPalette.primaryGreen
											: plantPalette.avatarLeaf
								}
								borderWidth={isToday ? 1.5 : 0}
								borderColor={plantPalette.primaryGreen}
							/>
							<Text
								fontSize={11}
								fontWeight={isToday ? "800" : "600"}
								color={isToday ? plantPalette.gardenText : plantPalette.textSubtle}>
								{DAY_INITIALS[weekday]}
							</Text>
						</YStack>
					);
				})}
			</XStack>
		</SurfaceCard>
	);
}
