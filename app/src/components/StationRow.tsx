import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Station } from '../lib/api';
import { uvCategory } from '../lib/uv';

const WHO_COLOR_HEX: Record<string, string> = {
  green: '#22c55e',
  yellow: '#eab308',
  orange: '#f97316',
  red: '#ef4444',
  purple: '#a855f7',
};

type StationRowProps = {
  station: Station;
};

function isDisplayableUv(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export const StationRow = memo(function StationRow({ station }: StationRowProps) {
  const uv = station.uvIndex;
  const hasUv = isDisplayableUv(uv);
  const category = hasUv ? uvCategory(uv) : null;
  const categoryColor = category
    ? (WHO_COLOR_HEX[category.color] ?? category.color)
    : undefined;
  const region =
    typeof station.region === 'string' && station.region.trim().length > 0
      ? station.region
      : 'Unknown';

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{station.name || 'Unnamed station'}</Text>
        <Text style={styles.region}>{region}</Text>
      </View>
      <View style={styles.uvBlock}>
        {category != null && hasUv ? (
          <>
            <Text style={[styles.uvValue, { color: categoryColor }]}>
              {uv}
            </Text>
            <Text style={[styles.uvLabel, { color: categoryColor }]}>
              {category.label}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.uvFallback}>—</Text>
            <Text style={styles.uvFallbackLabel}>No data</Text>
          </>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 2,
  },
  region: {
    fontSize: 13,
    color: '#666',
  },
  uvBlock: {
    alignItems: 'flex-end',
    minWidth: 72,
  },
  uvValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  uvLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  uvFallback: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
  },
  uvFallbackLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});
