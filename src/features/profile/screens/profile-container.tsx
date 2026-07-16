import { useMemo } from "react";

import { useGarden } from "@/features/garden";

import { ProfileView, type ProfileStats } from "./profile-view";

export function ProfileScreen() {
	const { state, level } = useGarden();
	const { player, plants, history } = state;

	const stats = useMemo<ProfileStats>(
		() => ({
			totalCare: history.length,
			plantCount: plants.length,
			badgesUnlocked: player.badges.filter((badge) => badge.unlockedAt !== null).length,
			streakDays: player.streakDays,
		}),
		[history.length, plants.length, player.badges, player.streakDays],
	);

	return (
		<ProfileView name={player.name} level={level} xp={player.xp} stats={stats} badges={player.badges} />
	);
}
