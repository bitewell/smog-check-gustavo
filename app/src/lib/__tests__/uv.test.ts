import { uvCategory } from '../uv';

describe('uvCategory', () => {
  it('is Low from 0 through the 2 boundary', () => {
    expect(uvCategory(0).label).toBe('Low');
    expect(uvCategory(2).label).toBe('Low');
  });

  it('is Moderate from 3 to 5', () => {
    expect(uvCategory(3).label).toBe('Moderate');
    expect(uvCategory(5).label).toBe('Moderate');
  });

  it('is High from 6 to 7', () => {
    expect(uvCategory(6).label).toBe('High');
    expect(uvCategory(7).label).toBe('High');
  });

  it('is Very High from 8 to 10', () => {
    expect(uvCategory(8).label).toBe('Very High');
    expect(uvCategory(10).label).toBe('Very High');
  });

  it('is Extreme at 11 and above', () => {
    expect(uvCategory(11).label).toBe('Extreme');
    expect(uvCategory(15).label).toBe('Extreme');
  });

  it('returns a color for the category', () => {
    expect(uvCategory(1).color).toBe('green');
    expect(uvCategory(12).color).toBe('purple');
  });
});
