import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";

import { useGarden } from "@/features/garden";
import { xpForCare } from "@/features/garden/domain/level";

import { HomeView } from "./home-view";

export function HomeScreen() {
	const { state, plants, level, plantsNeedingCare, now, waterPlant, dismissReward } = useGarden();
	const entranceAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(entranceAnim, {
			toValue: 1,
			duration: 550,
			useNativeDriver: true,
		}).start();
	}, [entranceAnim]);

	const contentAnimatedStyle = useMemo(
		() => ({
			opacity: entranceAnim,
			transform: [
				{ translateY: entranceAnim.interpolate({ inputRange: [0, 1], outputRange: [22, 0] }) },
			],
		}),
		[entranceAnim],
	);

	// Les plantes les plus assoiffées remontent : la liste répond à l’urgence,
	// pas à un ordre d’insertion arbitraire.
	const sortedPlants = useMemo(
		() => [...plants].sort((a, b) => a.health.waterLevel - b.health.waterLevel),
		[plants],
	);

	return (
		<HomeView
			player={state.player}
			level={level}
			plants={sortedPlants}
			plantsNeedingCare={plantsNeedingCare}
			xpReward={xpForCare("water", state.player)}
			now={now}
			reward={state.lastReward}
			onWater={waterPlant}
			onDismissReward={dismissReward}
			contentAnimatedStyle={contentAnimatedStyle}
		/>
	);
}
