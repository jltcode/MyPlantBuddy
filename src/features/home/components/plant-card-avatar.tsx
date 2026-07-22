import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

import { avatarCallToAction, AVATAR_STAGE_STYLES, avatarStageForLevel } from "@/features/garden/domain/avatar";
import type { PlantAvatar, PlantMood, PlantSpecies } from "@/features/garden/types";

/** Frimousse de la plante — le lien affectif passe par là, pas par une icône neutre. */
const MOOD_FACE: Record<PlantMood, string> = {
	thriving: "◡‿◡",
	thirsty: "•︵•",
	critical: "×︵×",
};

const MOOD_RING: Record<PlantMood, string> = {
	thriving: plantPalette.moodThriving,
	thirsty: plantPalette.moodThirsty,
	critical: plantPalette.moodCritical,
};

const SPECIES_ICON: Record<PlantSpecies, keyof typeof Ionicons.glyphMap> = {
	monstera: "leaf",
	ficus: "leaf-outline",
	succulent: "flower",
	pothos: "leaf",
	calathea: "flower-outline",
};

/** Positions des étincelles autour de l’avatar, du premier au dernier palier. */
const SPARKLE_SPOTS = [
	{ top: -4, left: -6, size: 14 },
	{ bottom: 2, left: -10, size: 12 },
	{ top: 14, right: -12, size: 11 },
] as const;

export type PlantCardAvatarProps = {
	mood: PlantMood;
	species: PlantSpecies;
	avatar: PlantAvatar | null;
	/** Niveau courant du joueur — sert à détecter un avatar en retard d’un palier. */
	level: number;
	now: number;
	size?: number;
	/** Ouvre le studio photo. Absent = avatar purement décoratif. */
	onPress?: () => void;
};

/**
 * Avatar de la plante. Sans photo : frimousse procédurale. Avec photo : l’image
 * transformée, entourée de l’aura de son palier. Un badge caméra pulse dès que
 * l’app attend une nouvelle photo — c’est lui qui ramène l’utilisateur vers sa
 * vraie plante.
 */
export function PlantCardAvatar({
	mood,
	species,
	avatar,
	level,
	now,
	size = 88,
	onPress,
}: PlantCardAvatarProps) {
	const ring = MOOD_RING[mood];
	const cta = avatarCallToAction(avatar, level, now);
	const stage = AVATAR_STAGE_STYLES[avatarStageForLevel(avatar?.level ?? level)];

	const pulse = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (cta === null) return;

		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.out(Easing.quad), useNativeDriver: true }),
				Animated.timing(pulse, { toValue: 0, duration: 700, easing: Easing.in(Easing.quad), useNativeDriver: true }),
			]),
		);
		loop.start();
		return () => loop.stop();
	}, [cta, pulse]);

	return (
		<Pressable
			onPress={onPress}
			disabled={!onPress}
			accessibilityRole="button"
			accessibilityLabel={`Avatar de la plante — ${cta ? "photo attendue" : stage.label}`}
			style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.96 : 1 }] })}>
			<YStack width={size} height={size}>
				{avatar ? (
					<YStack
						width={size}
						height={size}
						borderRadius={size / 2}
						borderWidth={3}
						borderColor={stage.auraColor}
						backgroundColor={stage.glowColor}
						alignItems="center"
						justifyContent="center"
						shadowColor={stage.auraColor}
						shadowOpacity={0.55}
						shadowRadius={10}
						shadowOffset={{ width: 0, height: 0 }}
						elevation={6}>
						<Image
							source={{ uri: avatar.transformedUri }}
							style={{ width: size - 12, height: size - 12, borderRadius: (size - 12) / 2 }}
							contentFit="cover"
							transition={250}
						/>

						{/* L’humeur reste lisible même en mode photo : petite bulle en bas. */}
						<XStack
							position="absolute"
							bottom={-6}
							alignSelf="center"
							backgroundColor={plantPalette.surfaceElevated}
							borderRadius={999}
							paddingHorizontal={7}
							paddingVertical={1}
							borderWidth={1.5}
							borderColor={ring}>
							<Text fontSize={size * 0.11} fontWeight="700" color={ring}>
								{MOOD_FACE[mood]}
							</Text>
						</XStack>

						{SPARKLE_SPOTS.slice(0, stage.sparkles).map((spot, index) => (
							<YStack key={index} position="absolute" {...spot}>
								<Ionicons name="sparkles" size={spot.size} color={stage.auraColor} />
							</YStack>
						))}
					</YStack>
				) : (
					<YStack
						width={size}
						height={size}
						borderRadius={size / 2}
						backgroundColor={mood === "thriving" ? plantPalette.avatarLeaf : plantPalette.warningAvatarBg}
						borderWidth={2.5}
						borderColor={ring}
						alignItems="center"
						justifyContent="center"
						gap="$1">
						<Ionicons name={SPECIES_ICON[species]} size={size * 0.3} color={plantPalette.iconTeal} />
						<Text fontSize={size * 0.14} fontWeight="700" color={ring}>
							{MOOD_FACE[mood]}
						</Text>
					</YStack>
				)}

				{cta !== null && onPress ? (
					<Animated.View
						style={{
							position: "absolute",
							top: -4,
							right: -4,
							transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] }) }],
						}}>
						<YStack
							width={28}
							height={28}
							borderRadius={14}
							alignItems="center"
							justifyContent="center"
							backgroundColor={plantPalette.xpGold}
							borderWidth={2}
							borderColor={plantPalette.surfaceElevated}>
							<Ionicons name="camera" size={15} color={plantPalette.levelInk} />
						</YStack>
					</Animated.View>
				) : null}
			</YStack>
		</Pressable>
	);
}
