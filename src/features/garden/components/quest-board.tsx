import { YStack } from "tamagui";

import { SectionHeader } from "@/components/ui/section-header";
import { SurfaceCard } from "@/components/ui/surface-card";
import { plantPalette } from "@/theme/plant-palette";

import type { Quest } from "../types";

import { QuestRow } from "./quest-row";

export type QuestBoardProps = {
	quests: Quest[];
};

/** Bloc « quêtes du jour » — l’objectif court terme qui structure la session. */
export function QuestBoard({ quests }: QuestBoardProps) {
	const completed = quests.filter((quest) => quest.progress >= quest.target).length;

	return (
		<YStack gap="$2.5">
			<SectionHeader title="Quêtes du jour" trailing={`${completed}/${quests.length}`} />
			<SurfaceCard gap="$3.5" paddingVertical="$4">
				{quests.map((quest, index) => (
					<YStack key={quest.id} gap="$3.5">
						{index > 0 ? <YStack height={1} backgroundColor={plantPalette.hairline} /> : null}
						<QuestRow quest={quest} />
					</YStack>
				))}
			</SurfaceCard>
		</YStack>
	);
}
