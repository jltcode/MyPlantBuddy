import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function App() {
	const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);

	useEffect(() => {
		const checkFirstLaunch = async () => {
			const hasLaunched = await AsyncStorage.getItem("hasLaunched");
			if (hasLaunched === null) {
				await AsyncStorage.setItem("hasLaunched", "true");
				setFirstLaunch(true);
			} else {
				setFirstLaunch(false);
			}
		};
		checkFirstLaunch();
	}, []);

	if (firstLaunch === null) return SplashScreen.preventAutoHideAsync();

	return <Stack initialRouteName={firstLaunch ? "onboarding" : "(tabs)"} screenOptions={{ headerShown: false }} />;
}
