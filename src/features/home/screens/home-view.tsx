import { Animated, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";

import { scrollScreenContentStyle } from "@/helpers/tamagui";
import { plantPalette } from "@/theme/plant-palette";

import { HomeBackground } from "../components/home-background";
import { HomePlantList } from "../components/home-plant-list";
import { HomeTopBar } from "../components/home-top-bar";
import { HomeWellbeingBanner } from "../components/home-wellbeing-banner";

import type { Plant } from "../types";

export type { Plant } from "../types";

export type HomeViewProps = {
	plants: Plant[];
	contentAnimatedStyle: NonNullable<Animated.AnimatedProps<ViewProps>["style"]>;
};

/**
 * Vue d’accueil : composition de blocs indépendants (fond, header, bandeau, liste).
 * Chaque bloc vit dans son propre fichier sous `components/`.
 */
export function HomeView({ plants, contentAnimatedStyle }: HomeViewProps) {
	const scrollPad = scrollScreenContentStyle();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }}>
			<HomeBackground />
			<Animated.View style={[{ flex: 1 }, contentAnimatedStyle]}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scrollPad}>
					<HomeTopBar />
					<HomeWellbeingBanner />
					<HomePlantList plants={plants} />
				</ScrollView>
			</Animated.View>
		</SafeAreaView>
	);
}
