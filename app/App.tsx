import { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StationRow } from './src/components/StationRow';
import { useStations } from './src/hooks/useStations';
import type { Station } from './src/lib/api';

export default function App() {
  const state = useStations();

  const renderItem = useCallback<ListRenderItem<Station>>(
    ({ item }) => <StationRow station={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UV Index Monitor</Text>

      {state.status === 'loading' && (
        <View style={styles.centered} accessibilityRole="progressbar">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.statusText}>Loading stations…</Text>
        </View>
      )}

      {state.status === 'error' && (
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{state.message}</Text>
        </View>
      )}

      {state.status === 'success' && state.stations.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.statusText}>No stations available.</Text>
        </View>
      )}

      {state.status === 'success' && state.stations.length > 0 && (
        <FlatList
          style={styles.list}
          data={state.stations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 56,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  statusText: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#b91c1c',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
});
