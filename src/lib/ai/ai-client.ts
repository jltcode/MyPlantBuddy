import { httpClient, type HttpClient } from "@/lib/http/http-client";
import type { HttpResult } from "@/lib/http/types";

import type {
	AiClient,
	AvatarTransformInput,
	AvatarTransformOutput,
	PlantInsightInput,
	PlantInsightOutput,
} from "./ai.types";

export function createAiClient(http: Pick<HttpClient, "post">): AiClient {
	return {
		async requestPlantInsight(
			input: PlantInsightInput,
			init,
		): Promise<HttpResult<PlantInsightOutput>> {
			return http.post<PlantInsightOutput>("/ai/plant-insight", {
				body: input,
				signal: init?.signal,
			});
		},
		async requestAvatarTransform(
			input: AvatarTransformInput,
			init,
		): Promise<HttpResult<AvatarTransformOutput>> {
			return http.post<AvatarTransformOutput>("/ai/avatar-transform", {
				body: input,
				signal: init?.signal,
			});
		},
	};
}

/** Instance branchée sur `httpClient` (URL = `EXPO_PUBLIC_API_BASE_URL` + `/v1`). */
export const aiClient = createAiClient(httpClient);
