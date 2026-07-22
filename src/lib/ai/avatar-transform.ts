import { env } from "@/core/config/env";

import { aiClient } from "./ai-client";

export type TransformPlantPhotoInput = Readonly<{
	plantId: string;
	photoUri: string;
	stage: string;
	level: number;
}>;

export type TransformPlantPhotoResult = Readonly<{
	/** URI affichable de l’avatar transformé. */
	transformedUri: string;
	/** `true` quand le résultat vient du mock local, pas du backend. */
	simulated: boolean;
}>;

/** Latence simulée du mock — assez longue pour que l’animation de « magie » se joue. */
const MOCK_TRANSFORM_MS = 2_200;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Transforme la photo d’une plante en avatar.
 *
 * - Backend configuré (`EXPO_PUBLIC_API_BASE_URL`) : la photo part en base64 vers
 *   `POST /ai/avatar-transform`, Nest appelle le fournisseur IA et renvoie l’URL générée.
 * - Sinon (phase front actuelle) : mock local — on rejoue la latence d’une génération
 *   et on renvoie la photo elle-même ; la stylisation par palier est portée par
 *   l’habillage visuel (`AVATAR_STAGE_STYLES`). L’appelant ne voit aucune différence.
 */
export async function transformPlantPhoto(
	input: TransformPlantPhotoInput,
	init?: Readonly<{ signal?: AbortSignal }>,
): Promise<TransformPlantPhotoResult> {
	if (env.apiBaseUrl) {
		const imageBase64 = await readAsBase64(input.photoUri);
		const result = await aiClient.requestAvatarTransform(
			{ plantId: input.plantId, imageBase64, stage: input.stage, level: input.level },
			init,
		);
		if (result.ok) {
			return { transformedUri: result.data.avatarUrl, simulated: false };
		}
		// Backend injoignable : on retombe sur le mock plutôt que de casser le flow.
	}

	await wait(MOCK_TRANSFORM_MS);
	return { transformedUri: input.photoUri, simulated: true };
}

async function readAsBase64(uri: string): Promise<string> {
	const response = await fetch(uri);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(reader.error);
		reader.onloadend = () => {
			const dataUrl = String(reader.result ?? "");
			resolve(dataUrl.slice(dataUrl.indexOf(",") + 1));
		};
		reader.readAsDataURL(blob);
	});
}
