import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

export type ProgressTrackProps = {
	/** Avancement 0 → 1 ; les valeurs hors bornes sont ramenées dans l’intervalle. */
	value: number;
	fillColor: string;
	trackColor?: string;
	height?: number;
	/** Largeur minimale du remplissage, pour qu’une valeur quasi nulle reste lisible. */
	minVisibleRatio?: number;
	animated?: boolean;
};

/**
 * Jauge générique (eau, lumière, XP). L’animation de largeur passe par le driver JS
 * — `width` en pourcentage n’est pas gérable par le driver natif.
 */
export function ProgressTrack({
	value,
	fillColor,
	trackColor = plantPalette.progressTrackBg,
	height = 12,
	minVisibleRatio = 0.04,
	animated = true,
}: ProgressTrackProps) {
	const target = Math.max(minVisibleRatio, Math.min(1, Math.max(0, value)));
	const progress = useRef(new Animated.Value(target)).current;

	useEffect(() => {
		if (!animated) {
			progress.setValue(target);
			return;
		}

		Animated.timing(progress, {
			toValue: target,
			duration: 520,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: false,
		}).start();
	}, [target, animated, progress]);

	const width = progress.interpolate({
		inputRange: [0, 1],
		outputRange: ["0%", "100%"],
	});

	return (
		<YStack flex={1} backgroundColor={trackColor} borderRadius={999} height={height} overflow="hidden">
			<Animated.View style={{ width, height: "100%" }}>
				<View style={{ flex: 1, borderRadius: 999, backgroundColor: fillColor }} />
			</Animated.View>
		</YStack>
	);
}
