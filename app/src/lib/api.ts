import Constants from 'expo-constants';

import type { Station } from './types';

export type { Station, StationReading } from './types';

/**
 * Base URL for the local API.
 *
 * We derive the host from the Expo/Metro connection so the app can reach the
 * server from Expo Go on a physical device or from the web target without you
 * editing an IP address. Falls back to localhost.
 */
function getApiBaseUrl(): string {
  // const hostUri = Constants.expoConfig?.hostUri; // e.g. "192.168.1.20:8081"
  // const host = hostUri?.split(':')[0] ?? 'localhost';
  return `http://192.168.29.27:4000`;
}

export const API_BASE_URL = getApiBaseUrl();

export async function fetchStations(): Promise<Station[]> {
  const response = await fetch(`${API_BASE_URL}/api/stations`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stations (${response.status})`);
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Failed to fetch stations (invalid response)');
  }
  return data as Station[];
}
