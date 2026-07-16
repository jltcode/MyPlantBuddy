import { useMemo } from "react";

import { useGarden } from "@/features/garden";

import { computeJournalStats, groupCareEventsByDay } from "../domain/group-care-events";
import { JournalView } from "./journal-view";

export function JournalScreen() {
	const { state, now } = useGarden();

	const groups = useMemo(() => groupCareEventsByDay(state.history, now), [state.history, now]);
	const stats = useMemo(() => computeJournalStats(state.history, now), [state.history, now]);

	return <JournalView groups={groups} stats={stats} streakDays={state.player.streakDays} now={now} />;
}
