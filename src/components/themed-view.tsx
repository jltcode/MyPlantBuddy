import { YStack, type YStackProps } from "tamagui";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = YStackProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	backgroundColor: backgroundColorProp,
	...otherProps
}: ThemedViewProps) {
	const themeBg = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <YStack backgroundColor={backgroundColorProp ?? themeBg} style={style} {...otherProps} />;
}
