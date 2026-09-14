import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// This is your starting point. Build the stations list here, or split it into
// components under src/ if you prefer. See the README for the task.
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UV Index Monitor</Text>
      <Text style={styles.hint}>Start here. See the README for what to build.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  hint: { fontSize: 14, color: '#666', textAlign: 'center' },
});
