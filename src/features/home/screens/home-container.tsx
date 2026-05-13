import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { HomeView, type Plant } from "./home-view";

const PLANTS_MOCK: Plant[] = [
	{ id: "ficus", name: "Ficus", waterLevel: 0.62, lightLevel: 0.5, mood: "happy", ctaLabel: "Arroser" },
	{
		id: "monstera",
		name: "Monstera",
		waterLevel: 0.72,
		lightLevel: 0.55,
		mood: "warning",
		warningLabel: "SOS Eau !",
	},
	{ id: "succulente", name: "Succulente", waterLevel: 0.4, lightLevel: 0.35, mood: "happy" },
];

export function HomeScreen() {
	const entranceAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(entranceAnim, {
			toValue: 1,
			duration: 550,
			useNativeDriver: true,
		}).start();
	}, [entranceAnim]);

	const contentAnimatedStyle = {
		opacity: entranceAnim,
		transform: [
			{
				translateY: entranceAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [22, 0],
				}),
			},
		],
	};

	return <HomeView plants={PLANTS_MOCK} contentAnimatedStyle={contentAnimatedStyle} />;
}
