export interface UvCategory {
  label: string;
  color: string;
}

/**
 * Maps a UV Index number to its category and color, using the standard WHO
 * UV Index bands (see the README). Implement this so the tests in uv.test.ts
 * pass.
 */
export function uvCategory(uv: number): UvCategory {
  if (uv <= 2) return { label: 'Low', color: 'green' };
  if (uv <= 5) return { label: 'Moderate', color: 'yellow' };
  if (uv <= 7) return { label: 'High', color: 'orange' };
  if (uv <= 10) return { label: 'Very High', color: 'red' };
  return { label: 'Extreme', color: 'purple' };
}
