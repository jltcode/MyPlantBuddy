import { YStack } from "tamagui";

import { SectionHeader } from "@/components/ui/section-header";

import type { PlantWithHealth } from "@/features/garden/state/garden-provider";

import { PlantCard } from "./plant-card";

export type HomePlantListProps = {
	plants: PlantWithHealth[];
	xpReward: number;
	onWater: (plantId: string) => void;
};

/** Liste des cartes plantes, déjà triée par urgence en amont. */
export function HomePlantList({ plants, xpReward, onWater }: HomePlantListProps) {
	return (
		<YStack gap="$2.5">
			<SectionHeader title="Mes plantes" trailing={`${plants.length}`} />
			<YStack gap="$3">
				{plants.map((plant) => (
					<PlantCard key={plant.id} plant={plant} xpReward={xpReward} onWater={onWater} />
				))}
			</YStack>
		</YStack>
	);
}
