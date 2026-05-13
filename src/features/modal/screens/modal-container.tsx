import { Link } from "expo-router";
import { StyleSheet } from "react-native";

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
				<Link href="/" dismissTo style={styles.link}>
					<ThemedText type="link">{COPY.linkLabel}</ThemedText>
				</Link>
			}
		/>
	);
}

const styles = StyleSheet.create({
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
