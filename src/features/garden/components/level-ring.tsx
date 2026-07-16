import Svg, { Circle } from "react-native-svg";
import { Text, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

export type LevelRingProps = {
	level: number;
	/** Avancement dans le niveau courant, 0 → 1. */
	ratio: number;
	size?: number;
};

/**
 * Pastille de niveau cerclée d’un arc d’XP. L’arc part de midi (rotation -90°)
 * et se remplit dans le sens horaire.
 */
export function LevelRing({ level, ratio, size = 58 }: LevelRingProps) {
	const strokeWidth = 5;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const clamped = Math.min(1, Math.max(0, ratio));

	return (
		<YStack width={size} height={size} alignItems="center" justifyContent="center">
			<Svg width={size} height={size} style={{ position: "absolute" }}>
				<Circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={plantPalette.xpTrack}
					strokeWidth={strokeWidth}
					fill={plantPalette.surfaceElevated}
				/>
				<Circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke={plantPalette.xpGold}
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={circumference * (1 - clamped)}
					fill="transparent"
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
				/>
			</Svg>
			<Text fontSize={10} fontWeight="700" color={plantPalette.textSubtle} marginBottom={-3}>
				NIV
			</Text>
			<Text fontSize={19} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.levelInk}>
				{level}
			</Text>
		</YStack>
	);
}
