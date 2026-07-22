import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Animated, Easing, Modal, Pressable } from "react-native";
import { Button, Text, XStack, YStack } from "tamagui";

import { transformPlantPhoto } from "@/lib/ai";
import { plantPalette } from "@/theme/plant-palette";
import { Fonts } from "@/theme/theme";

import {
	avatarCallToAction,
	avatarCallToActionLabel,
	AVATAR_STAGE_STYLES,
	avatarStageForLevel,
} from "@/features/garden/domain/avatar";
import type { PlantWithHealth } from "@/features/garden/state/garden-provider";

const AVATAR_PREVIEW_SIZE = 168;

type StudioStep = "idle" | "transforming" | "done";

export type AvatarStudioSheetProps = {
	/** Plante en cours de shooting, `null` = studio fermé. */
	plant: PlantWithHealth | null;
	level: number;
	now: number;
	xpReward: number;
	onCaptured: (plantId: string, photoUri: string, transformedUri: string) => void;
	onClose: () => void;
};

/**
 * Studio photo : prendre une vraie photo de sa plante, la voir se transformer en
 * avatar du palier courant. La caméra n’existant pas sur simulateur, la galerie
 * reste toujours proposée — indispensable pour tester le flow côté front.
 */
export function AvatarStudioSheet({
	plant,
	level,
	now,
	xpReward,
	onCaptured,
	onClose,
}: AvatarStudioSheetProps) {
	const [step, setStep] = useState<StudioStep>("idle");
	const [resultUri, setResultUri] = useState<string | null>(null);

	const stage = AVATAR_STAGE_STYLES[avatarStageForLevel(level)];
	const cta = plant ? avatarCallToAction(plant.avatar, level, now) : null;

	const spin = useRef(new Animated.Value(0)).current;

	// Nouveau shooting = repartir de zéro (le composant reste monté entre deux plantes).
	const plantId = plant?.id ?? null;
	useEffect(() => {
		setStep("idle");
		setResultUri(null);
	}, [plantId]);

	useEffect(() => {
		if (step !== "transforming") return;

		spin.setValue(0);
		const loop = Animated.loop(
			Animated.timing(spin, { toValue: 1, duration: 1_400, easing: Easing.linear, useNativeDriver: true }),
		);
		loop.start();
		return () => loop.stop();
	}, [step, spin]);

	const runTransform = useCallback(
		async (photoUri: string) => {
			if (!plant) return;
			setStep("transforming");

			try {
				const { transformedUri } = await transformPlantPhoto({
					plantId: plant.id,
					photoUri,
					stage: avatarStageForLevel(level),
					level,
				});
				setResultUri(transformedUri);
				setStep("done");
				onCaptured(plant.id, photoUri, transformedUri);
			} catch {
				setStep("idle");
				Alert.alert("Oups", "La transformation a échoué, réessaie dans un instant.");
			}
		},
		[plant, level, onCaptured],
	);

	const pickPhoto = useCallback(
		async (source: "camera" | "library") => {
			const options: ImagePicker.ImagePickerOptions = {
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.7,
			};

			let result: ImagePicker.ImagePickerResult;
			if (source === "camera") {
				const permission = await ImagePicker.requestCameraPermissionsAsync();
				if (!permission.granted) {
					Alert.alert("Caméra indisponible", "Autorise la caméra pour photographier ta plante.");
					return;
				}
				result = await ImagePicker.launchCameraAsync(options);
			} else {
				result = await ImagePicker.launchImageLibraryAsync(options);
			}

			const asset = result.assets?.[0];
			if (result.canceled || !asset) return;
			await runTransform(asset.uri);
		},
		[runTransform],
	);

	if (!plant) return null;

	return (
		<Modal visible transparent animationType="fade" onRequestClose={onClose}>
			{/* Le fond assombri ferme le studio ; la carte, elle, absorbe les taps. */}
			<Pressable
				onPress={step === "transforming" ? undefined : onClose}
				style={{ flex: 1, backgroundColor: "#0D342599", justifyContent: "flex-end" }}>
				<Pressable onPress={() => {}}>
					<YStack
						backgroundColor={plantPalette.gardenBackground}
						borderTopLeftRadius={28}
						borderTopRightRadius={28}
						paddingHorizontal="$5"
						paddingTop="$4"
						paddingBottom="$6"
						gap="$3.5">
						<XStack alignItems="center" justifyContent="space-between">
							<YStack flex={1} gap="$1">
								<Text
									fontSize={20}
									fontWeight="800"
									fontFamily={Fonts.rounded}
									color={plantPalette.gardenTextDeep}>
									Studio de {plant.name}
								</Text>
								<Text fontSize={13} fontWeight="600" color={plantPalette.textSubtle}>
									Palier {stage.label} · niveau {level}
								</Text>
							</YStack>
							{step !== "transforming" ? (
								<Button
									unstyled
									width={34}
									height={34}
									borderRadius={17}
									alignItems="center"
									justifyContent="center"
									backgroundColor={plantPalette.surfaceSunken}
									accessibilityRole="button"
									accessibilityLabel="Fermer le studio"
									onPress={onClose}>
									<Ionicons name="close" size={18} color={plantPalette.gardenTextDeep} />
								</Button>
							) : null}
						</XStack>

						{/* Scène centrale : avatar actuel, roue de transformation, ou résultat. */}
						<YStack alignItems="center" gap="$3" paddingVertical="$2">
							{step === "transforming" ? (
								<YStack alignItems="center" gap="$3">
									<Animated.View
										style={{
											transform: [
												{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) },
											],
										}}>
										<YStack
											width={AVATAR_PREVIEW_SIZE}
											height={AVATAR_PREVIEW_SIZE}
											borderRadius={AVATAR_PREVIEW_SIZE / 2}
											borderWidth={4}
											borderColor={stage.auraColor}
											borderStyle="dashed"
											alignItems="center"
											justifyContent="center">
											<Ionicons name="sparkles" size={44} color={stage.auraColor} />
										</YStack>
									</Animated.View>
									<Text fontSize={15} fontWeight="700" fontFamily={Fonts.rounded} color={plantPalette.gardenDescription}>
										L’IA transforme ta plante…
									</Text>
								</YStack>
							) : (
								<YStack
									width={AVATAR_PREVIEW_SIZE}
									height={AVATAR_PREVIEW_SIZE}
									borderRadius={AVATAR_PREVIEW_SIZE / 2}
									borderWidth={4}
									borderColor={stage.auraColor}
									backgroundColor={stage.glowColor}
									alignItems="center"
									justifyContent="center"
									shadowColor={stage.auraColor}
									shadowOpacity={0.5}
									shadowRadius={16}
									shadowOffset={{ width: 0, height: 0 }}
									elevation={8}>
									{resultUri ?? plant.avatar ? (
										<Image
											source={{ uri: resultUri ?? plant.avatar?.transformedUri }}
											style={{
												width: AVATAR_PREVIEW_SIZE - 16,
												height: AVATAR_PREVIEW_SIZE - 16,
												borderRadius: (AVATAR_PREVIEW_SIZE - 16) / 2,
											}}
											contentFit="cover"
											transition={400}
										/>
									) : (
										<Ionicons name="camera-outline" size={52} color={plantPalette.iconTeal} />
									)}
								</YStack>
							)}

							<Text
								fontSize={14}
								fontWeight="600"
								color={plantPalette.gardenDescription}
								textAlign="center">
								{step === "done"
									? `Avatar ${stage.label} adopté — ${stage.description}`
									: cta
										? avatarCallToActionLabel(cta)
										: "Avatar à jour. Tu peux quand même refaire son portrait (sans XP)."}
							</Text>

							{step !== "done" && cta ? (
								<XStack
									backgroundColor={plantPalette.xpGoldSoft}
									borderRadius={999}
									paddingHorizontal="$3"
									paddingVertical={4}
									alignItems="center"
									gap="$1.5">
									<Ionicons name="flash" size={14} color={plantPalette.sunIcon} />
									<Text fontSize={12.5} fontWeight="800" color={plantPalette.levelInk}>
										+{xpReward} XP à la clé
									</Text>
								</XStack>
							) : null}
						</YStack>

						{step === "done" ? (
							<Button
								unstyled
								backgroundColor={plantPalette.primaryGreen}
								borderRadius={999}
								minHeight={52}
								alignItems="center"
								justifyContent="center"
								flexDirection="row"
								gap="$2"
								pressStyle={{ opacity: 0.9, scale: 0.97 }}
								accessibilityRole="button"
								onPress={onClose}>
								<Ionicons name="checkmark-circle" size={20} color={plantPalette.textOnDark} />
								<Text fontSize={16} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.textOnDark}>
									Magnifique !
								</Text>
							</Button>
						) : (
							<YStack gap="$2.5" opacity={step === "transforming" ? 0.4 : 1}>
								<Button
									unstyled
									disabled={step === "transforming"}
									backgroundColor={plantPalette.primaryGreen}
									borderRadius={999}
									minHeight={52}
									alignItems="center"
									justifyContent="center"
									flexDirection="row"
									gap="$2"
									pressStyle={{ opacity: 0.9, scale: 0.97 }}
									accessibilityRole="button"
									onPress={() => void pickPhoto("camera")}>
									<Ionicons name="camera" size={20} color={plantPalette.textOnDark} />
									<Text fontSize={16} fontWeight="800" fontFamily={Fonts.rounded} color={plantPalette.textOnDark}>
										Prendre une photo
									</Text>
								</Button>

								<Button
									unstyled
									disabled={step === "transforming"}
									backgroundColor={plantPalette.surfaceElevated}
									borderWidth={1.5}
									borderColor={plantPalette.hairline}
									borderRadius={999}
									minHeight={48}
									alignItems="center"
									justifyContent="center"
									flexDirection="row"
									gap="$2"
									pressStyle={{ opacity: 0.9, scale: 0.97 }}
									accessibilityRole="button"
									onPress={() => void pickPhoto("library")}>
									<Ionicons name="images-outline" size={18} color={plantPalette.gardenTextDeep} />
									<Text fontSize={15} fontWeight="700" fontFamily={Fonts.rounded} color={plantPalette.gardenTextDeep}>
										Choisir dans la galerie
									</Text>
								</Button>
							</YStack>
						)}
					</YStack>
				</Pressable>
			</Pressable>
		</Modal>
	);
}
