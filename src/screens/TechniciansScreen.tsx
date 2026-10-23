import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { hives } from '../data/mockData';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface TechnicianSummary {
  name: string;
  hiveCount: number;
}

const TechniciansScreen: React.FC = () => {
  const technicians = useMemo<TechnicianSummary[]>(() => {
    const counts = new Map<string, number>();
    hives.forEach((hive) => {
      counts.set(hive.technician, (counts.get(hive.technician) ?? 0) + 1);
    });
    return Array.from(counts, ([name, hiveCount]) => ({ name, hiveCount }));
  }, []);

  return (
    <FlatList<TechnicianSummary>
      style={styles.container}
      contentContainerStyle={styles.list}
      data={technicians}
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.detail}>{item.hiveCount} colmenas a cargo</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.lg,
  },
  separator: {
    height: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  name: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  detail: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});

export default TechniciansScreen;