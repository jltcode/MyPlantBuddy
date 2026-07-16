import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { plantPalette } from "@/theme/plant-palette";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: plantPalette.tabActive,
				tabBarInactiveTintColor: plantPalette.tabInactive,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
					marginBottom: Platform.OS === "ios" ? -2 : 4,
				},
				tabBarStyle: {
					backgroundColor: plantPalette.tabBarBg,
					borderTopWidth: 0,
					elevation: 0,
					height: Platform.OS === "ios" ? 88 : 70,
					paddingTop: 10,
					paddingBottom: Platform.OS === "ios" ? 22 : 10,
					borderTopLeftRadius: 22,
					borderTopRightRadius: 22,
					position: "absolute",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Accueil",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={23} name={focused ? "leaf" : "leaf-outline"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: "Journal",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={23} name={focused ? "book" : "book-outline"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="decouvrir"
				options={{
					title: "Découvrir",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={23} name={focused ? "compass" : "compass-outline"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profil"
				options={{
					title: "Profil",
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={23} name={focused ? "person" : "person-outline"} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					href: null,
				}}
			/>
		</Tabs>
	);
}
