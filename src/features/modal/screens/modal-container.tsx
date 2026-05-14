import { Link } from "expo-router";
import { YStack } from "tamagui";

import { ThemedText } from "@/components/themed-text";

import { ModalView } from "./modal-view";

const COPY = {
	title: "This is a modal",
	linkLabel: "Go to home screen",
} as const;

export function ModalScreen() {
	return (
		<ModalView
			title={COPY.title}
			footer={
				<YStack marginTop="$4" paddingVertical="$3">
					<Link href="/" dismissTo>
						<ThemedText type="link">{COPY.linkLabel}</ThemedText>
					</Link>
				</YStack>
			}
		/>
	);
}
