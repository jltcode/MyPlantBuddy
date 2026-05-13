import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type CenteredMessageScreenProps = {
	title: string;
	description: string;
};

/**
 * Layout partagé : fond vert clair, titre + texte centrés (écrans placeholder / onboarding).
 */
export function CenteredMessageScreen({ title, description }: CenteredMessageScreenProps) {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#E8F2EC",
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 24,
		gap: 10,
	},
	title: {
		fontSize: 34,
		fontWeight: "800",
		color: "#123D2D",
	},
	description: {
		fontSize: 18,
		color: "#2A5D46",
		textAlign: "center",
	},
});
