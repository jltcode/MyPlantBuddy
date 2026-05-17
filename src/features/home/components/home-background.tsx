import { YStack } from "tamagui";

import { plantPalette } from "@/theme/plant-palette";

/** Décor de fond : halos verts (purement visuel, sans interaction). */
export function HomeBackground() {
	return (
		<>
			<YStack
				pointerEvents="none"
				position="absolute"
				borderRadius={999}
				backgroundColor={plantPalette.gardenBlob}
				width={280}
				height={280}
				top={-120}
				left={-90}
			/>
			<YStack
				pointerEvents="none"
				position="absolute"
				borderRadius={999}
				backgroundColor={plantPalette.gardenBlob}
				width={220}
				height={220}
				top={260}
				right={-120}
				opacity={0.65}
			/>
		</>
	);
}
