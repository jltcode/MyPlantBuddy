import { Platform } from "react-native";
import type { GetProps } from "tamagui";
import { YStack } from "tamagui";

type YStackProps = GetProps<typeof YStack>;

/** Colonne plein écran centrée (placeholders, empty states). */
export const flexCenterColumn: Pick<YStackProps, "flex" | "ai" | "jc" | "gap"> = {
	flex: 1,
	ai: "center",
	jc: "center",
	gap: "$3",
};

/** Padding horizontal récurrent des écrans « carte » / liste. */
export const screenGutter = 18 as const;

/**
 * Conteneur scroll : gouttières + espacement vertical homogène.
 * La tab bar étant en `position: absolute`, le bas doit dégager sa hauteur,
 * sinon le dernier élément de liste finit masqué dessous.
 */
export function scrollScreenContentStyle(): Pick<
	YStackProps,
	"paddingHorizontal" | "paddingTop" | "paddingBottom" | "gap"
> {
	return {
		paddingHorizontal: screenGutter,
		paddingTop: 14,
		paddingBottom: Platform.OS === "ios" ? 104 : 86,
		gap: 14,
	};
}
