import Ionicons from "@expo/vector-icons/Ionicons";
import { Animated, View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ScrollView, Text, XStack, YStack } from "tamagui";

import { scrollScreenContentStyle } from "@/helpers/tamagui";
import { Fonts } from "@/theme/theme";
import { plantPalette } from "@/theme/plant-palette";

export type Plant = {
	id: string;
	name: string;
	waterLevel: number;
	lightLevel: number;
	mood: "happy" | "warning";
	ctaLabel?: string;
	warningLabel?: string;
};

export type HomeViewProps = {
	plants: Plant[];
	contentAnimatedStyle: NonNullable<Animated.AnimatedProps<ViewProps>["style"]>;
};

function ProgressRow({
	icon,
	value,
	fillColor,
}: {
	icon: keyof typeof Ionicons.glyphMap;
	value: number;
	fillColor: string;
}) {
	const widthPercent = Math.max(8, value * 100);
	return (
		<XStack alignItems="center" gap="$3">
			<Ionicons name={icon} size={18} color={plantPalette.iconTeal} />
			<YStack
				flex={1}
				backgroundColor={plantPalette.progressTrackBg}
				borderWidth={1.6}
				borderColor={plantPalette.cardBorder}
				borderRadius={999}
				height={19}
				overflow="hidden">
				<View
					style={{
						width: `${widthPercent}%`,
						height: "100%",
						borderRadius: 999,
						backgroundColor: fillColor,
					}}
				/>
			</YStack>
		</XStack>
	);
}

function PlantCard({ plant, featured }: { plant: Plant; featured?: boolean }) {
	return (
		<YStack
			backgroundColor={plantPalette.cardSurface}
			borderRadius={24}
			padding="$4"
			shadowColor={plantPalette.shadow}
			shadowOpacity={0.1}
			shadowRadius={18}
			shadowOffset={{ width: 0, height: 10 }}
			elevation={5}>
			<XStack alignItems="center" justifyContent="space-between" marginBottom="$3.5">
				<Text
					color={plantPalette.gardenTextDeep}
					fontSize={24}
					fontWeight="800"
					fontFamily={Fonts.rounded}
					maxWidth="70%">
					{plant.name}
				</Text>
				{plant.warningLabel ? (
					<Text
						backgroundColor={plantPalette.warningRed}
						color="#FFFFFF"
						fontWeight="800"
						fontSize={14}
						paddingHorizontal="$3"
						paddingVertical="$1.5"
						borderRadius={12}>
						{plant.warningLabel}
					</Text>
				) : null}
			</XStack>

			<XStack alignItems="center" justifyContent="space-between" gap="$4">
				<YStack flex={1} gap="$3">
					<ProgressRow icon="water-outline" value={plant.waterLevel} fillColor={plantPalette.waterBlue} />
					<ProgressRow icon="sunny-outline" value={plant.lightLevel} fillColor={plantPalette.sunYellow} />
				</YStack>

				<YStack
					width={106}
					height={106}
					borderRadius={53}
					backgroundColor={plant.mood === "warning" ? plantPalette.warningAvatarBg : plantPalette.avatarLeaf}
					alignItems="center"
					justifyContent="center">
					<Ionicons name="leaf" size={38} color={plantPalette.iconTeal} />
				</YStack>
			</XStack>

			{featured && plant.ctaLabel ? (
				<Button
					marginTop="$4"
					backgroundColor={plantPalette.primaryGreen}
					borderRadius={999}
					borderWidth={4}
					borderColor={plantPalette.primaryGreenBorder}
					paddingVertical={13}
					pressStyle={{ opacity: 0.92 }}>
					<Text color="#FFFFFF" fontSize={22} fontWeight="800" fontFamily={Fonts.rounded}>
						{plant.ctaLabel}
					</Text>
				</Button>
			) : null}
		</YStack>
	);
}

export function HomeView({ plants, contentAnimatedStyle }: HomeViewProps) {
	const scrollPad = scrollScreenContentStyle();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }}>
			<YStack pointerEvents="none" position="absolute" borderRadius={999} backgroundColor={plantPalette.gardenBlob} width={280} height={280} top={-120} left={-90} />
			<YStack
				pointerEvents="none"
				position="absolute"
				borderRadius={999}
				backgroundColor={plantPalette.gardenBlob}
				width={220}
				height={220}
				top={260}
				right={-120}
				opacity={0.65}
			/>
			<Animated.View style={[{ flex: 1 }, contentAnimatedStyle]}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scrollPad}>
					<XStack alignItems="center" justifyContent="space-between" marginTop="$1.5">
						<Text
							fontSize={34}
							lineHeight={40}
							fontWeight="800"
							fontFamily={Fonts.rounded}
							color={plantPalette.gardenText}
							flex={1}
							maxWidth="74%">
							Mon jardin Connecté
						</Text>
						<XStack alignItems="center" gap="$2.5">
							<Button
								circular
								size="$3"
								chromeless
								borderWidth={2}
								borderColor={plantPalette.roundButtonBorder}
								backgroundColor={plantPalette.roundButtonBg}
								icon={<Ionicons name="add" size={20} color={plantPalette.roundButtonIcon} />}
								pressStyle={{ opacity: 0.85 }}
								onPress={() => undefined}
							/>
							<YStack position="relative">
								<Button
									circular
									size="$3"
									chromeless
									borderWidth={2}
									borderColor={plantPalette.roundButtonBorder}
									backgroundColor={plantPalette.roundButtonBg}
									icon={<Ionicons name="notifications" size={18} color={plantPalette.roundButtonIcon} />}
									pressStyle={{ opacity: 0.85 }}
									onPress={() => undefined}
								/>
								<YStack
									pointerEvents="none"
									position="absolute"
									top={-4}
									right={-5}
									minWidth={18}
									height={18}
									borderRadius={9}
									backgroundColor={plantPalette.badgeRed}
									alignItems="center"
									justifyContent="center"
									paddingHorizontal={4}>
									<Text color="#FFFFFF" fontSize={11} fontWeight="700">
										2
									</Text>
								</YStack>
							</YStack>
						</XStack>
					</XStack>

					<XStack
						backgroundColor={plantPalette.statusBannerBg}
						borderRadius={18}
						paddingHorizontal="$3.5"
						paddingVertical="$3.5"
						alignItems="center"
						gap="$2.5">
						<Ionicons name="sunny" size={18} color={plantPalette.sunIcon} />
						<Text color={plantPalette.gardenTextMuted} fontSize={17} fontWeight="600" fontFamily={Fonts.sans} flex={1}>
							Toutes vos plantes vont bien aujourd&apos;hui.
						</Text>
					</XStack>

					{plants.map((plant, index) => (
						<PlantCard key={plant.id} plant={plant} featured={index === 0} />
					))}
				</ScrollView>
			</Animated.View>
		</SafeAreaView>
	);
}
