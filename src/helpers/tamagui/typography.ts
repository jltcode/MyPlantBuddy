import type { TextProps } from "tamagui";

export type TextRole = "default" | "title" | "defaultSemiBold" | "subtitle" | "link";

const linkColor = "#0a7ea4";

/** Styles de texte réutilisables (évite les `StyleSheet` dupliqués). */
export const textRoleProps: Record<TextRole, Pick<TextProps, "fontSize" | "lineHeight" | "fontWeight" | "color">> = {
	default: { fontSize: 16, lineHeight: 24 },
	defaultSemiBold: { fontSize: 16, lineHeight: 24, fontWeight: "600" },
	title: { fontSize: 32, fontWeight: "700", lineHeight: 32 },
	subtitle: { fontSize: 20, fontWeight: "700" },
	link: { fontSize: 16, lineHeight: 30, color: linkColor },
};
