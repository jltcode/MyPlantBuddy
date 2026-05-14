import { getDefaultTamaguiConfig } from "@tamagui/config-default";
import { createTamagui } from "tamagui";

const base = getDefaultTamaguiConfig("native");

/** Thème aligné sur `src/theme/theme.ts` (Expo / navigation). */
export const config = createTamagui({
	...base,
	themes: {
		...base.themes,
		light: {
			...base.themes.light,
			background: "#ffffff",
			color: "#11181C",
		},
		dark: {
			...base.themes.dark,
			background: "#151718",
			color: "#ECEDEE",
		},
	},
});

export default config;

export type AppTamaguiConfig = typeof config;

declare module "tamagui" {
	interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
