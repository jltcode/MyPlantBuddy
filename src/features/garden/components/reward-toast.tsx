import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";
import { Text, XStack, YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import type { RewardFeedback } from "../types";

const VISIBLE_MS = 2600;

/** Le toast doit flotter au-dessus de la tab bar absolue, pas dessous. */
const BOTTOM_OFFSET = Platform.OS === "ios" ? 100 : 82;

export type RewardToastProps = {
	reward: RewardFeedback | null;
	onDismiss: () => void;
};

/** Message principal : le palier franchi prime sur le badge, qui prime sur la quête. */
function headline(reward: RewardFeedback): { icon: keyof typeof Ionicons.glyphMap; text: string } {
	if (reward.leveledUpTo !== null) {
		return { icon: "trophy", text: `Niveau ${reward.leveledUpTo} atteint !` };
	}
	const [badge] = reward.badgesUnlocked;
	if (badge) return { icon: "ribbon", text: `Badge « ${badge.label} » débloqué !` };

	const [quest] = reward.questsCompleted;
	if (quest) return { icon: "checkmark-circle", text: `Quête terminée : ${quest.label}` };

	if (reward.action === "photo") {
		return { icon: "camera", text: `L’avatar de ${reward.plantName} a évolué !` };
	}
	return { icon: "water", text: `${reward.plantName} est arrosé` };
}

/**
 * Bandeau flottant de récompense. Auto-masqué après `VISIBLE_MS` ; l’animation se
 * rejoue à chaque `reward.id`, y compris pour deux gains identiques d’affilée.
 */
export function RewardToast({ reward, onDismiss }: RewardToastProps) {
	const anim = useRef(new Animated.Value(0)).current;
	const rewardId = reward?.id ?? null;

	useEffect(() => {
		if (rewardId === null) return;

		anim.setValue(0);
		Animated.timing(anim, {
			toValue: 1,
			duration: 260,
			easing: Easing.out(Easing.back(1.4)),
			useNativeDriver: true,
		}).start();

		const timer = setTimeout(() => {
			Animated.timing(anim, {
				toValue: 0,
				duration: 200,
				easing: Easing.in(Easing.quad),
				useNativeDriver: true,
			}).start(({ finished }) => {
				if (finished) onDismiss();
			});
		}, VISIBLE_MS);

		return () => clearTimeout(timer);
	}, [rewardId, anim, onDismiss]);

	if (!reward) return null;

	const { icon, text } = headline(reward);

	return (
		<Animated.View
			pointerEvents="none"
			style={{
				position: "absolute",
				left: 18,
				right: 18,
				bottom: BOTTOM_OFFSET,
				opacity: anim,
				transform: [
					{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
					{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) },
				],
			}}>
			<XStack
				alignItems="center"
				gap="$3"
				backgroundColor={plantPalette.tabBarBg}
				borderRadius={20}
				paddingHorizontal="$4"
				paddingVertical="$3.5"
				shadowColor={plantPalette.shadow}
				shadowOpacity={0.28}
				shadowRadius={20}
				shadowOffset={{ width: 0, height: 12 }}
				elevation={8}>
				<YStack
					width={36}
					height={36}
					borderRadius={18}
					alignItems="center"
					justifyContent="center"
					backgroundColor={plantPalette.xpGold}>
					<Ionicons name={icon} size={20} color={plantPalette.levelInk} />
				</YStack>

				<Text flex={1} fontSize={15} fontWeight="700" fontFamily={Fonts.rounded} color={plantPalette.textOnDark}>
					{text}
				</Text>

				<Text fontSize={16} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.xpGold}>
					+{reward.xpGained} XP
				</Text>
			</XStack>
		</Animated.View>
	);
}
