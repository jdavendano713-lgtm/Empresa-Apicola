import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ItemCard from '../components/ItemCard';
import { useSavedStore } from '../stores/savedStore';
import { Hive } from '../types';
import { RootTabParamList } from '../types/navigation';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

const SavedScreen: React.FC = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<RootTabParamList, 'SavedTab'>>();

  const savedItems = useSavedStore((state) => state.savedItems);
  const clearAll = useSavedStore((state) => state.clearAll);

  const handlePress = useCallback(
    (item: Hive): void => {
      navigation.navigate('HivesTab', {
        screen: 'HiveDetail',
        params: { hiveId: item.id, hiveName: item.name },
      });
    },
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Hive>>(
    ({ item }) => <ItemCard item={item} onPress={handlePress} />,
    [handlePress],
  );

  return (
    <View style={styles.container}>
      <FlatList<Hive>
        data={savedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>🍯 Nada guardado</Text>
            <Text style={styles.emptyText}>
              Abre el detalle de una colmena y toca "Guardar".
            </Text>
          </View>
        }
        ListFooterComponent={
          savedItems.length > 0 ? (
            <Pressable
              onPress={clearAll}
              style={({ pressed }) => [
                styles.clearButton,
                pressed && styles.clearButtonPressed,
              ]}
            >
              <Text style={styles.clearText}>Limpiar todo</Text>
            </Pressable>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.lg, flexGrow: 1 },
  separator: { height: SPACING.md },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  clearButton: {
    backgroundColor: COLORS.danger,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  clearButtonPressed: { opacity: 0.7 },
  clearText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
});

export default SavedScreen;