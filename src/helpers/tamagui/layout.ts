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

/** Conteneur scroll : gouttières + espacement vertical homogène. */
export function scrollScreenContentStyle(): Pick<
	YStackProps,
	"paddingHorizontal" | "paddingTop" | "paddingBottom" | "gap"
> {
	return {
		paddingHorizontal: screenGutter,
		paddingTop: 14,
		paddingBottom: 24,
		gap: 14,
	};
}
