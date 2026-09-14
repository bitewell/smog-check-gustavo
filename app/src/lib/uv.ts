export interface UvCategory {
  label: string;
  color: string;
}

/**
 * Maps a UV Index number to its category and color, using the standard WHO
 * UV Index bands (see the README). Implement this so the tests in uv.test.ts
 * pass.
 *
 * The placeholder below is intentionally wrong so the tests fail until you
 * implement it.
 */
export function uvCategory(uv: number): UvCategory {
  // TODO: implement.
  return { label: String(uv), color: 'gray' };
}
