export type Plant = {
	id: string;
	name: string;
	waterLevel: number;
	lightLevel: number;
	mood: "happy" | "warning";
	ctaLabel?: string;
	warningLabel?: string;
};
