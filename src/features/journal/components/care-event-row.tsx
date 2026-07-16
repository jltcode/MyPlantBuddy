import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, XStack, YStack } from "tamagui";

import { formatTime } from "@/helpers/format-date";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { CareAction, CareEvent } from "@/features/garden/types";

const ACTION_STYLE: Record<CareAction, { icon: keyof typeof Ionicons.glyphMap; color: string; verb: string }> = {
	water: { icon: "water", color: plantPalette.waterBlue, verb: "Arrosage" },
	light: { icon: "sunny", color: plantPalette.sunYellow, verb: "Exposition ajustée" },
	repot: { icon: "flower", color: plantPalette.primaryGreen, verb: "Rempotage" },
	diagnose: { icon: "medkit", color: plantPalette.iconTeal, verb: "Diagnostic" },
};

export type CareEventRowProps = {
	event: CareEvent;
	/** Masque le trait vertical sous la pastille pour le dernier élément du groupe. */
	isLast: boolean;
};

/** Un soin dans la timeline : pastille reliée, libellé, heure et XP gagnée. */
export function CareEventRow({ event, isLast }: CareEventRowProps) {
	const style = ACTION_STYLE[event.action];

	return (
		<XStack gap="$3">
			<YStack alignItems="center" width={34}>
				<YStack
					width={34}
					height={34}
					borderRadius={17}
					alignItems="center"
					justifyContent="center"
					backgroundColor={`${style.color}22`}
					borderWidth={1.5}
					borderColor={style.color}>
					<Ionicons name={style.icon} size={17} color={style.color} />
				</YStack>
				{!isLast ? <YStack flex={1} width={2} backgroundColor={plantPalette.hairline} marginTop={4} /> : null}
			</YStack>

			<YStack flex={1} paddingBottom={isLast ? 0 : 18} gap="$1">
				<XStack alignItems="center" justifyContent="space-between" gap="$2">
					<Text
						flex={1}
						fontSize={15.5}
						fontWeight="700"
						fontFamily={Fonts.rounded}
						color={plantPalette.gardenTextDeep}
						numberOfLines={1}>
						{style.verb} · {event.plantName}
					</Text>
					<Text fontSize={12} fontWeight="800" color={plantPalette.sunIcon}>
						+{event.xpEarned} XP
					</Text>
				</XStack>
				<Text fontSize={12.5} fontWeight="600" color={plantPalette.textSubtle}>
					{formatTime(event.at)}
				</Text>
			</YStack>
		</XStack>
	);
}
