import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#A8DA92",
				tabBarInactiveTintColor: "#D6EFC6",
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
					marginBottom: Platform.OS === "ios" ? -2 : 4,
				},
				tabBarStyle: {
					backgroundColor: "#0D3425",
					borderTopWidth: 0,
					elevation: 0,
					height: Platform.OS === "ios" ? 88 : 70,
					paddingTop: 10,
					paddingBottom: Platform.OS === "ios" ? 22 : 10,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Accueil",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="journal"
				options={{
					title: "Journal",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="book.closed.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="decouvrir"
				options={{
					title: "Découvrir",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="magnifyingglass" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profil"
				options={{
					title: "Profil",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.fill" color={color} />,
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
