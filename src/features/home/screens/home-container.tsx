import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated } from "react-native";

import { useGarden } from "@/features/garden";
import { xpForCare } from "@/features/garden/domain/level";

import { HomeView } from "./home-view";

export function HomeScreen() {
	const { state, plants, level, plantsNeedingCare, now, waterPlant, capturePlantAvatar, dismissReward } =
		useGarden();
	const entranceAnim = useRef(new Animated.Value(0)).current;

	/** Plante ouverte dans le studio photo, `null` = studio fermé. */
	const [studioPlantId, setStudioPlantId] = useState<string | null>(null);

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

	// Relu depuis `plants` (et non figé à l’ouverture) : le studio affiche
	// toujours l’avatar le plus frais, y compris juste après une capture.
	const studioPlant = useMemo(
		() => plants.find((plant) => plant.id === studioPlantId) ?? null,
		[plants, studioPlantId],
	);

	const openStudio = useCallback((plantId: string) => setStudioPlantId(plantId), []);
	const closeStudio = useCallback(() => setStudioPlantId(null), []);

	return (
		<HomeView
			player={state.player}
			level={level}
			plants={sortedPlants}
			plantsNeedingCare={plantsNeedingCare}
			xpReward={xpForCare("water", state.player)}
			photoXpReward={xpForCare("photo", state.player)}
			now={now}
			reward={state.lastReward}
			studioPlant={studioPlant}
			onWater={waterPlant}
			onOpenStudio={openStudio}
			onCloseStudio={closeStudio}
			onAvatarCaptured={capturePlantAvatar}
			onDismissReward={dismissReward}
			contentAnimatedStyle={contentAnimatedStyle}
		/>
	);
}
