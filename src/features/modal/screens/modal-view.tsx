import type { ReactNode } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export type ModalViewProps = {
	title: string;
	footer: ReactNode;
};

export function ModalView({ title, footer }: ModalViewProps) {
	return (
		<ThemedView style={styles.container}>
			<ThemedText type="title">{title}</ThemedText>
			{footer}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
