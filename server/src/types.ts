export interface StationReading {
  ts: string;
  uvIndex: number;
}

export interface Station {
  id: string;
  name: string;
  /** Missing in source → `"Unknown"` on the API */
  region: string;
  /** `null` when offline / no reading */
  uvIndex: number | null;
  lastUpdated: string;
  readings: StationReading[];
}
