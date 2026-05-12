import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Fonts } from "@/theme";

type Plant = {
	id: string;
	name: string;
	waterLevel: number;
	lightLevel: number;
	mood: "happy" | "warning";
	ctaLabel?: string;
	warningLabel?: string;
};

const plants: Plant[] = [
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

function ProgressRow({
	icon,
	value,
	fillColor,
}: {
	icon: keyof typeof Ionicons.glyphMap;
	value: number;
	fillColor: string;
}) {
	return (
		<View style={styles.progressRow}>
			<Ionicons name={icon} size={18} color="#4F9F86" />
			<View style={styles.progressTrack}>
				<View
					style={[styles.progressFill, { width: `${Math.max(8, value * 100)}%`, backgroundColor: fillColor }]}
				/>
			</View>
		</View>
	);
}

function PlantCard({ plant, featured }: { plant: Plant; featured?: boolean }) {
	return (
		<View style={styles.card}>
			<View style={styles.cardTopRow}>
				<Text style={styles.cardTitle}>{plant.name}</Text>
				{plant.warningLabel ? <Text style={styles.warningPill}>{plant.warningLabel}</Text> : null}
			</View>

			<View style={styles.cardBody}>
				<View style={styles.cardMetrics}>
					<ProgressRow icon="water-outline" value={plant.waterLevel} fillColor="#43A9DB" />
					<ProgressRow icon="sunny-outline" value={plant.lightLevel} fillColor="#F0C34E" />
				</View>

				<View style={[styles.avatarCircle, plant.mood === "warning" ? styles.avatarWarning : null]}>
					<Ionicons name="leaf" size={38} color="#3A874B" />
				</View>
			</View>

			{featured && plant.ctaLabel ? (
				<TouchableOpacity activeOpacity={0.85} style={styles.primaryButton}>
					<Text style={styles.primaryButtonText}>{plant.ctaLabel}</Text>
				</TouchableOpacity>
			) : null}
		</View>
	);
}

export function HomeScreen() {
	const entranceAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(entranceAnim, {
			toValue: 1,
			duration: 550,
			useNativeDriver: true,
		}).start();
	}, [entranceAnim]);

	return (
		<SafeAreaView style={styles.safeArea}>
			<View pointerEvents="none" style={[styles.blob, styles.blobLeft]} />
			<View pointerEvents="none" style={[styles.blob, styles.blobRight]} />
			<Animated.View
				style={{
					flex: 1,
					opacity: entranceAnim,
					transform: [
						{
							translateY: entranceAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [22, 0],
							}),
						},
					],
				}}
			>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
					<View style={styles.headerRow}>
						<Text style={styles.pageTitle}>Mon jardin Connecté</Text>
						<View style={styles.headerActions}>
							<TouchableOpacity activeOpacity={0.85} style={styles.roundButton}>
								<Ionicons name="add" size={20} color="#174D38" />
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.85} style={styles.roundButton}>
								<Ionicons name="notifications" size={18} color="#174D38" />
								<View style={styles.badge}>
									<Text style={styles.badgeText}>2</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.statusBanner}>
						<Ionicons name="sunny" size={18} color="#E2AA31" />
						<Text style={styles.statusText}>Toutes vos plantes vont bien aujourd&apos;hui.</Text>
					</View>

					{plants.map((plant, index) => (
						<PlantCard key={plant.id} plant={plant} featured={index === 0} />
					))}
				</ScrollView>
			</Animated.View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#E8F2EC",
	},
	blob: {
		position: "absolute",
		borderRadius: 999,
		backgroundColor: "#D6EAD9",
	},
	blobLeft: {
		width: 280,
		height: 280,
		top: -120,
		left: -90,
	},
	blobRight: {
		width: 220,
		height: 220,
		top: 260,
		right: -120,
		opacity: 0.65,
	},
	scrollContent: {
		paddingHorizontal: 18,
		paddingTop: 14,
		paddingBottom: 24,
		gap: 14,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 6,
	},
	pageTitle: {
		fontSize: 34,
		lineHeight: 40,
		fontWeight: "800",
		fontFamily: Fonts.rounded,
		color: "#123D2D",
		flex: 1,
		maxWidth: "74%",
	},
	headerActions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	roundButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		borderWidth: 2,
		borderColor: "#29634A",
		backgroundColor: "#EAF5EF",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	badge: {
		position: "absolute",
		top: -4,
		right: -5,
		minWidth: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: "#F2554C",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 4,
	},
	badgeText: {
		color: "#FFFFFF",
		fontSize: 11,
		fontWeight: "700",
	},
	statusBanner: {
		backgroundColor: "#E3EFE6",
		borderRadius: 18,
		paddingHorizontal: 14,
		paddingVertical: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	statusText: {
		color: "#204836",
		fontSize: 17,
		fontWeight: "600",
		fontFamily: Fonts.sans,
		flex: 1,
	},
	card: {
		backgroundColor: "#EAF3EE",
		borderRadius: 24,
		padding: 18,
		shadowColor: "#244438",
		shadowOpacity: 0.1,
		shadowRadius: 18,
		shadowOffset: { width: 0, height: 10 },
		elevation: 5,
	},
	cardTopRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 14,
	},
	cardTitle: {
		color: "#113C2C",
		fontSize: 24,
		fontWeight: "800",
		fontFamily: Fonts.rounded,
		maxWidth: "70%",
	},
	warningPill: {
		backgroundColor: "#F05D4F",
		color: "#FFFFFF",
		fontWeight: "800",
		fontSize: 14,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	cardBody: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 16,
	},
	cardMetrics: {
		flex: 1,
		gap: 12,
	},
	progressRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	progressTrack: {
		flex: 1,
		backgroundColor: "#F4F8F5",
		borderWidth: 1.6,
		borderColor: "#447764",
		borderRadius: 999,
		height: 19,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 999,
	},
	avatarCircle: {
		width: 106,
		height: 106,
		borderRadius: 53,
		backgroundColor: "#DCEFD8",
		alignItems: "center",
		justifyContent: "center",
	},
	avatarWarning: {
		backgroundColor: "#ECF0DB",
	},
	primaryButton: {
		marginTop: 16,
		backgroundColor: "#7DBE66",
		borderRadius: 999,
		borderWidth: 4,
		borderColor: "#F4F9F5",
		paddingVertical: 13,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "#FFFFFF",
		fontSize: 22,
		fontWeight: "800",
		fontFamily: Fonts.rounded,
	},
});
