import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, XStack, YStack } from "tamagui";

import { SectionHeader } from "@/components/ui/section-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { scrollScreenContentStyle } from "@/helpers/tamagui";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import { SuggestionCard } from "../components/suggestion-card";
import { CARE_TIPS, PLANT_SUGGESTIONS, type CareTip } from "../data/discover-mock";

export type DiscoverViewProps = {
	/** Conseil mis en avant, choisi selon l’état du jardin. */
	featuredTip: CareTip;
};

function TipRow({ tip }: { tip: CareTip }) {
	return (
		<XStack gap="$3" alignItems="flex-start">
			<YStack
				width={34}
				height={34}
				borderRadius={17}
				alignItems="center"
				justifyContent="center"
				backgroundColor={plantPalette.surfaceSunken}>
				<Ionicons name={tip.icon} size={17} color={plantPalette.iconTeal} />
			</YStack>
			<YStack flex={1} gap="$1">
				<Text fontSize={15} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.gardenTextDeep}>
					{tip.title}
				</Text>
				<Text fontSize={13} fontWeight="600" color={plantPalette.gardenDescription} lineHeight={19}>
					{tip.body}
				</Text>
			</YStack>
		</XStack>
	);
}

/** Découvrir : conseil du jour contextuel, autres conseils, plantes suggérées. */
export function DiscoverView({ featuredTip }: DiscoverViewProps) {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }} edges={["top", "left", "right"]}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scrollScreenContentStyle()}>
				<Text
					fontSize={28}
					fontWeight="800"
					fontFamily={Fonts.rounded}
					color={plantPalette.gardenText}
					marginTop="$1">
					Découvrir
				</Text>

				<YStack
					backgroundColor={plantPalette.tabBarBg}
					borderRadius={24}
					padding="$4"
					gap="$3"
					shadowColor={plantPalette.shadow}
					shadowOpacity={0.18}
					shadowRadius={18}
					shadowOffset={{ width: 0, height: 10 }}
					elevation={5}>
					<XStack alignItems="center" gap="$2">
						<Ionicons name={featuredTip.icon} size={17} color={plantPalette.xpGold} />
						<Text fontSize={12} fontWeight="800" color={plantPalette.xpGold} textTransform="uppercase">
							Conseil du jour
						</Text>
					</XStack>
					<Text fontSize={20} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.textOnDark}>
						{featuredTip.title}
					</Text>
					<Text fontSize={14} fontWeight="600" color={plantPalette.tabInactive} lineHeight={20}>
						{featuredTip.body}
					</Text>
				</YStack>

				<SectionHeader title="Bons réflexes" />
				<SurfaceCard gap="$4">
					{CARE_TIPS.map((tip) => (
						<TipRow key={tip.id} tip={tip} />
					))}
				</SurfaceCard>

				<SectionHeader title="À adopter" trailing={`${PLANT_SUGGESTIONS.length}`} />
				<XStack flexWrap="wrap" gap="$3">
					{PLANT_SUGGESTIONS.map((suggestion) => (
						<SuggestionCard key={suggestion.id} suggestion={suggestion} />
					))}
				</XStack>
			</ScrollView>
		</SafeAreaView>
	);
}
