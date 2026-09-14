import rawStations from '../data/stations.json';
import type { Station, StationReading } from './types';

/** Loose shape of a station as stored in stations.json (intentionally messy). */
interface RawStationReading {
  ts?: unknown;
  uvIndex?: unknown;
}

interface RawStation {
  id?: unknown;
  name?: unknown;
  region?: unknown;
  uvIndex?: unknown;
  lastUpdated?: unknown;
  __internalId?: unknown;
  readings?: unknown;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function cleanReading(raw: RawStationReading): StationReading | null {
  const uv = cleanUvIndex(raw.uvIndex);
  if (typeof raw.ts !== 'string' || uv === null) {
    return null;
  }
  return { ts: raw.ts, uvIndex: uv };
}

function cleanReadings(raw: unknown): StationReading[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .filter((item): item is RawStationReading => item !== null && typeof item === 'object')
    .map(cleanReading)
    .filter((reading): reading is StationReading => reading !== null);
}

function cleanUvIndex(value: unknown): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  // Non-finite or negative values are not valid UV Index readings.
  return isFiniteNumber(value) && value >= 0 ? value : null;
}

function cleanRegion(value: unknown): string {
  if (typeof value !== 'string') {
    return 'Unknown';
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : 'Unknown';
}

export function cleanStation(raw: RawStation): Station | null {
  if (typeof raw.id !== 'string' || raw.id.trim().length === 0) {
    return null;
  }
  if (typeof raw.name !== 'string' || raw.name.trim().length === 0) {
    return null;
  }
  if (typeof raw.lastUpdated !== 'string') {
    return null;
  }

  // Public shape only — never copy `__internalId` or other raw keys through.
  return {
    id: raw.id.trim(),
    name: raw.name.trim(),
    region: cleanRegion(raw.region),
    uvIndex: cleanUvIndex(raw.uvIndex),
    lastUpdated: raw.lastUpdated,
    readings: cleanReadings(raw.readings),
  };
}

export function getStations(): Station[] {
  const list = rawStations as RawStation[];
  return list
    .map(cleanStation)
    .filter((station): station is Station => station !== null);
}
