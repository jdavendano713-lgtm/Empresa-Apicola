import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Hive, HiveStatus } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface ItemCardProps {
  item: Hive;
  onPress: (item: Hive) => void;
}

const statusColors: Record<HiveStatus, string> = {
  [HiveStatus.Active]: COLORS.success,
  [HiveStatus.InReview]: COLORS.warning,
  [HiveStatus.Inactive]: COLORS.danger,
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[item.status] }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.location}>{item.location}</Text>
      <View style={styles.row}>
        <Text style={styles.detail}>Técnico: {item.technician}</Text>
        <Text style={styles.detail}>{item.honeyKg} kg de miel</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.pressed,
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  location: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginVertical: SPACING.xs,
  },
  detail: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.lg,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.surface,
  },
});

export default ItemCard;