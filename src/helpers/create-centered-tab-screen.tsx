import type { FunctionComponent } from "react";

import { CenteredMessageScreen } from "@/components/layout/centered-message-screen";

export type CenteredTabScreenCopy = {
	title: string;
	description: string;
};

/**
 * Fabrique un écran “tab” sans logique : titre + description centrés.
 * Évite de dupliquer container + view pour chaque placeholder.
 */
export function createCenteredTabScreen(
	copy: CenteredTabScreenCopy,
	displayName?: string,
): FunctionComponent {
	const Screen: FunctionComponent = () => (
		<CenteredMessageScreen title={copy.title} description={copy.description} />
	);
	Screen.displayName = displayName ?? `${copy.title}Screen`;
	return Screen;
}
