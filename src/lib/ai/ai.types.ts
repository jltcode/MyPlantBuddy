import type { HttpResult } from "@/lib/http/types";

/** Entrée alignée sur un futur DTO Nest (`PlantInsightDto`). */
export type PlantInsightInput = Readonly<{
	plantId: string;
	locale: string;
}>;

/** Réponse métier — le backend agrège le fournisseur IA et renvoie un JSON stable. */
export type PlantInsightOutput = Readonly<{
	summary: string;
}>;

export type AiClient = Readonly<{
	requestPlantInsight: (
		input: PlantInsightInput,
		init?: Readonly<{ signal?: AbortSignal }>,
	) => Promise<HttpResult<PlantInsightOutput>>;
}>;
