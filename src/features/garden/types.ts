/** Types du domaine « jardin » : plantes suivies, joueur et sa progression. */

export type PlantSpecies = "ficus" | "monstera" | "succulent" | "pothos" | "calathea";

/**
 * Avatar généré depuis une vraie photo de la plante. Tant que le backend Nest
 * n’existe pas, `transformedUri` pointe sur la photo stylisée côté client ;
 * plus tard ce sera l’URL de l’image générée par l’IA.
 */
export type PlantAvatar = {
	/** Photo originale prise par l’utilisateur. */
	photoUri: string;
	/** Image affichée comme avatar (photo transformée). */
	transformedUri: string;
	/** Timestamp (ms) de la capture. */
	capturedAt: number;
	/** Niveau du joueur au moment de la transformation — sert à détecter l’avatar périmé. */
	level: number;
};

/** Rythme d’arrosage attendu, exprimé en heures entre deux arrosages. */
export type Plant = {
	id: string;
	name: string;
	species: PlantSpecies;
	room: string;
	/** Ensoleillement mesuré par le capteur, 0 → 1. */
	lightLevel: number;
	/** Heures théoriques entre deux arrosages pour cette plante. */
	wateringIntervalHours: number;
	/** Timestamp (ms) du dernier arrosage. */
	lastWateredAt: number;
	/** `null` tant qu’aucune photo n’a été transformée. */
	avatar: PlantAvatar | null;
};

/** État de santé dérivé du temps écoulé depuis le dernier arrosage. */
export type PlantMood = "thriving" | "thirsty" | "critical";

export type PlantHealth = {
	/** Réserve d’eau restante, 0 → 1. */
	waterLevel: number;
	mood: PlantMood;
	/** Heures avant le prochain arrosage (négatif = en retard). */
	hoursUntilWatering: number;
};

export type CareAction = "water" | "light" | "repot" | "diagnose" | "photo";

/** Une entrée du journal de soins. */
export type CareEvent = {
	id: string;
	plantId: string;
	plantName: string;
	action: CareAction;
	at: number;
	xpEarned: number;
};

export type QuestId = "water-one" | "water-three" | "rescue-all";

export type Quest = {
	id: QuestId;
	label: string;
	hint: string;
	xpReward: number;
	target: number;
	progress: number;
};

export type BadgeId = "first-drop" | "week-streak" | "green-thumb" | "collector" | "night-owl";

export type Badge = {
	id: BadgeId;
	label: string;
	description: string;
	tier: "bronze" | "silver" | "gold";
	/** Timestamp (ms) de déblocage, `null` tant que verrouillé. */
	unlockedAt: number | null;
};

export type Player = {
	name: string;
	xp: number;
	/** Nombre de jours consécutifs avec au moins un soin. */
	streakDays: number;
	/** Timestamp (ms) du dernier jour actif, sert à maintenir la série. */
	lastActiveAt: number;
	quests: Quest[];
	badges: Badge[];
};

/**
 * Résumé d’un soin, produit par le reducer et consommé par la couche d’affichage
 * pour célébrer le geste (toast, haptique). `id` change à chaque soin afin de
 * rejouer l’animation même si les gains sont identiques.
 */
export type RewardFeedback = {
	id: string;
	plantName: string;
	/** Geste célébré — le toast adapte son message par défaut. */
	action: CareAction;
	xpGained: number;
	/** Niveau atteint si le soin a fait franchir un palier, sinon `null`. */
	leveledUpTo: number | null;
	questsCompleted: Quest[];
	badgesUnlocked: Badge[];
};

export type GardenState = {
	player: Player;
	plants: Plant[];
	history: CareEvent[];
	lastReward: RewardFeedback | null;
};
