import { useEffect, useState } from 'react';
import { fetchStations, type Station } from '../lib/api';

export type StationsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; stations: Station[] };

export function useStations(): StationsState {
  const [state, setState] = useState<StationsState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stations = await fetchStations();
        if (!cancelled) {
          setState({ status: 'success', stations });
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'Failed to load stations';
          setState({ status: 'error', message });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
