import Ionicons from "@expo/vector-icons/Ionicons";

export type CareTip = {
	id: string;
	title: string;
	body: string;
	icon: keyof typeof Ionicons.glyphMap;
};

export type PlantSuggestion = {
	id: string;
	name: string;
	/** Difficulté d’entretien, 1 (très facile) → 3 (exigeante). */
	difficulty: 1 | 2 | 3;
	light: string;
	waterEvery: string;
};

/** Conseil affiché quand le jardin a soif — le contenu suit l’état réel du jardin. */
export const THIRSTY_TIP: CareTip = {
	id: "thirsty",
	title: "Vérifie avant d’arroser",
	body: "Enfonce un doigt sur 2 cm dans le terreau : s’il est encore humide, attends un jour de plus. Le sur-arrosage tue plus de plantes que l’oubli.",
	icon: "water",
};

export const HEALTHY_TIP: CareTip = {
	id: "healthy",
	title: "Fais tourner tes pots",
	body: "Un quart de tour par semaine et ta plante poussera droit au lieu de se pencher vers la fenêtre.",
	icon: "sync",
};

export const CARE_TIPS: CareTip[] = [
	{
		id: "light",
		title: "Lumière indirecte",
		body: "Derrière un voilage, la plupart des plantes tropicales reçoivent exactement ce qu’il leur faut.",
		icon: "sunny",
	},
	{
		id: "dust",
		title: "Dépoussière les feuilles",
		body: "Un chiffon humide une fois par mois : la photosynthèse retrouve jusqu’à 20 % d’efficacité.",
		icon: "sparkles",
	},
	{
		id: "winter",
		title: "Lève le pied en hiver",
		body: "La croissance ralentit, les besoins en eau aussi. Espace les arrosages d’une semaine.",
		icon: "snow",
	},
];

export const PLANT_SUGGESTIONS: PlantSuggestion[] = [
	{ id: "pothos", name: "Pothos", difficulty: 1, light: "Faible à moyenne", waterEvery: "7 j" },
	{ id: "zz", name: "Zamioculcas", difficulty: 1, light: "Faible", waterEvery: "14 j" },
	{ id: "calathea", name: "Calathea", difficulty: 3, light: "Indirecte", waterEvery: "4 j" },
	{ id: "aloe", name: "Aloe vera", difficulty: 1, light: "Vive", waterEvery: "21 j" },
];
