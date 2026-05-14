import { Text, type TextProps } from "tamagui";

import { textRoleProps, type TextRole } from "@/helpers/tamagui";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: TextRole;
};

export function ThemedText({
	style,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const themeTextColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
	const role = textRoleProps[type];
	const color =
		type === "link" && !(lightColor ?? darkColor) ? (role.color ?? themeTextColor) : themeTextColor;

	return <Text {...role} color={color} {...rest} />;
}
