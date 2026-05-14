import { PropsWithChildren, useState } from "react";
import { Button, XStack, YStack } from "tamagui";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/theme/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const theme = useColorScheme() ?? "light";

	return (
		<YStack>
			<Button
				unstyled
				onPress={() => {
					setIsOpen((value) => !value);
				}}
				paddingVertical="$1"
				paddingHorizontal={0}>
				<XStack alignItems="center" gap="$2">
					<IconSymbol
						name="chevron.right"
						size={18}
						weight="medium"
						color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
						style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
					/>
					<ThemedText type="defaultSemiBold">{title}</ThemedText>
				</XStack>
			</Button>
			{isOpen ? (
				<YStack marginTop="$2" marginLeft="$6">
					{children}
				</YStack>
			) : null}
		</YStack>
	);
}
