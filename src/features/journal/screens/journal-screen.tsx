import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

export function JournalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Journal</Text>
        <Text style={styles.description}>Historique des soins et rappels a venir.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F2EC',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#123D2D',
  },
  description: {
    fontSize: 18,
    color: '#2A5D46',
    textAlign: 'center',
  },
});
