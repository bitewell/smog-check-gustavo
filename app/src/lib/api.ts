import Constants from 'expo-constants';

/**
 * Base URL for the local API.
 *
 * We derive the host from the Expo/Metro connection so the app can reach the
 * server from Expo Go on a physical device or from the web target without you
 * editing an IP address. Falls back to localhost.
 */
function getApiBaseUrl(): string {
  const hostUri = Constants.expoConfig?.hostUri; // e.g. "192.168.1.20:8081"
  const host = hostUri?.split(':')[0] ?? 'localhost';
  return `http://${host}:4000`;
}

export const API_BASE_URL = getApiBaseUrl();
