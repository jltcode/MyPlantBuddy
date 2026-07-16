import { YStack, type YStackProps } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

export type SurfaceCardProps = YStackProps & {
	/** `flat` pour les blocs secondaires, `raised` pour les cartes de premier plan. */
	elevation?: "flat" | "raised";
};

/**
 * Surface de base de l’app : rayon, fond et ombre homogènes.
 * Passe par ici plutôt que de redéfinir `shadow*` dans chaque écran.
 */
export function SurfaceCard({ elevation = "raised", children, ...props }: SurfaceCardProps) {
	const raised = elevation === "raised";

	return (
		<YStack
			backgroundColor={raised ? plantPalette.surfaceElevated : plantPalette.cardSurface}
			borderRadius={24}
			padding="$4"
			borderWidth={1}
			borderColor={plantPalette.hairline}
			shadowColor={plantPalette.shadow}
			shadowOpacity={raised ? 0.1 : 0.04}
			shadowRadius={raised ? 18 : 8}
			shadowOffset={{ width: 0, height: raised ? 10 : 4 }}
			elevation={raised ? 5 : 1}
			{...props}>
			{children}
		</YStack>
	);
}
