import type { Plant } from "../types";

import { PlantCard } from "./plant-card";

export type HomePlantListProps = {
	plants: Plant[];
};

/** Liste des cartes plantes — la première est mise en avant (featured). */
export function HomePlantList({ plants }: HomePlantListProps) {
	return (
		<>
			{plants.map((plant, index) => (
				<PlantCard key={plant.id} plant={plant} featured={index === 0} />
			))}
		</>
	);
}
