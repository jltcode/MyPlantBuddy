import { Animated, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";

import { SurfaceCard } from "@/components/ui/surface-card";
import { scrollScreenContentStyle } from "@/helpers/tamagui";
import { plantPalette } from "@/theme/plant-palette";

import { PlayerHeader } from "@/features/garden/components/player-header";
import { QuestBoard } from "@/features/garden/components/quest-board";
import { RewardToast } from "@/features/garden/components/reward-toast";
import type { LevelProgress } from "@/features/garden/domain/level";
import type { PlantWithHealth } from "@/features/garden/state/garden-provider";
import type { Player, RewardFeedback } from "@/features/garden/types";

import { AvatarStudioSheet } from "../components/avatar-studio-sheet";
import { HomeBackground } from "../components/home-background";
import { HomePlantList } from "../components/home-plant-list";
import { HomeTopBar } from "../components/home-top-bar";
import { HomeWellbeingBanner } from "../components/home-wellbeing-banner";

export type HomeViewProps = {
	player: Player;
	level: LevelProgress;
	plants: PlantWithHealth[];
	plantsNeedingCare: number;
	xpReward: number;
	photoXpReward: number;
	now: number;
	reward: RewardFeedback | null;
	/** Plante ouverte dans le studio photo, `null` = studio fermé. */
	studioPlant: PlantWithHealth | null;
	onWater: (plantId: string) => void;
	onOpenStudio: (plantId: string) => void;
	onCloseStudio: () => void;
	onAvatarCaptured: (plantId: string, photoUri: string, transformedUri: string) => void;
	onDismissReward: () => void;
	contentAnimatedStyle: NonNullable<Animated.AnimatedProps<ViewProps>["style"]>;
};

/**
 * Vue d’accueil : présentation pure. L’ordre suit la boucle de jeu —
 * qui je suis (niveau), ce qu’on attend de moi (quêtes), ce que je fais (plantes).
 */
export function HomeView({
	player,
	level,
	plants,
	plantsNeedingCare,
	xpReward,
	photoXpReward,
	now,
	reward,
	studioPlant,
	onWater,
	onOpenStudio,
	onCloseStudio,
	onAvatarCaptured,
	onDismissReward,
	contentAnimatedStyle,
}: HomeViewProps) {
	const scrollPad = scrollScreenContentStyle();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: plantPalette.gardenBackground }} edges={["top", "left", "right"]}>
			<HomeBackground />

			<Animated.View style={[{ flex: 1 }, contentAnimatedStyle]}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={scrollPad}>
					<HomeTopBar now={now} alertCount={plantsNeedingCare} />

					<SurfaceCard paddingVertical="$3.5">
						<PlayerHeader name={player.name} level={level} streakDays={player.streakDays} />
					</SurfaceCard>

					<HomeWellbeingBanner plantsNeedingCare={plantsNeedingCare} />
					<QuestBoard quests={player.quests} />
					<HomePlantList
						plants={plants}
						xpReward={xpReward}
						level={level.level}
						now={now}
						onWater={onWater}
						onOpenStudio={onOpenStudio}
					/>
				</ScrollView>
			</Animated.View>

			<AvatarStudioSheet
				plant={studioPlant}
				level={level.level}
				now={now}
				xpReward={photoXpReward}
				onCaptured={onAvatarCaptured}
				onClose={onCloseStudio}
			/>

			<RewardToast reward={reward} onDismiss={onDismissReward} />
		</SafeAreaView>
	);
}
