import { createCenteredTabScreen } from "@/helpers/create-centered-tab-screen";

export const JournalScreen = createCenteredTabScreen(
	{
		title: "Journal",
		description: "Historique des soins et rappels a venir.",
	},
	"JournalScreen",
);
