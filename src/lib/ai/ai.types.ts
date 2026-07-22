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

/** Entrée alignée sur un futur DTO Nest (`AvatarTransformDto`). */
export type AvatarTransformInput = Readonly<{
	plantId: string;
	/** Photo encodée en base64 — le backend la relaie au fournisseur IA (Stable Diffusion, …). */
	imageBase64: string;
	/** Palier visuel demandé, dérivé du niveau du joueur. */
	stage: string;
	level: number;
}>;

/** Réponse métier — URL de l’avatar généré, stocké côté backend. */
export type AvatarTransformOutput = Readonly<{
	avatarUrl: string;
}>;

export type AiClient = Readonly<{
	requestPlantInsight: (
		input: PlantInsightInput,
		init?: Readonly<{ signal?: AbortSignal }>,
	) => Promise<HttpResult<PlantInsightOutput>>;
	requestAvatarTransform: (
		input: AvatarTransformInput,
		init?: Readonly<{ signal?: AbortSignal }>,
	) => Promise<HttpResult<AvatarTransformOutput>>;
}>;
