import type { ReactNode } from "react";
import { YStack } from "tamagui";

import { ThemedText } from "@/components/themed-text";

export type ModalViewProps = {
	title: string;
	footer: ReactNode;
};

export function ModalView({ title, footer }: ModalViewProps) {
	return (
		<YStack flex={1} alignItems="center" justifyContent="center" padding="$5" backgroundColor="$background">
			<ThemedText type="title">{title}</ThemedText>
			{footer}
		</YStack>
	);
}
