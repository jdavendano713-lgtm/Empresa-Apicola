import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ItemCard from '../components/ItemCard';
import { useSavedStore, SavedState } from '../stores/savedStore';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { Hive } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type SavedScreenProps = BottomTabScreenProps<MainTabParamList, 'SavedTab'>;

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

const SavedScreen: React.FC<SavedScreenProps> = ({ navigation }) => {
  const savedItems = useSavedStore((state: SavedState) => state.savedItems);
  const clearAll = useSavedStore((state: SavedState) => state.clearAll);

  const stackNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = useCallback(
    (item: Hive): void => {
      stackNav?.navigate('Detail', { itemId: item.id, itemName: item.name });
    },
    [stackNav],
  );

  const renderItem = useCallback<ListRenderItem<Hive>>(
    ({ item }) => <ItemCard item={item} onPress={handlePress} />,
    [handlePress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>⭐ Guardados</Text>
          <Text style={styles.headerSubtitle}>{savedItems.length} colmenas guardadas</Text>
        </View>
        {savedItems.length > 0 && (
          <Pressable
            onPress={clearAll}
            style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
          >
            <Text style={styles.clearText}>Limpiar todo</Text>
          </Pressable>
        )}
      </View>

      <FlatList<Hive>
        data={savedItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyTitle}>Sin colmenas guardadas</Text>
            <Text style={styles.emptyText}>
              Abre una colmena y pulsa "Guardar" para verla aquí.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: { fontSize: TYPOGRAPHY.title, fontWeight: 'bold', color: COLORS.textPrimary },
  headerSubtitle: { fontSize: TYPOGRAPHY.subtitle, color: COLORS.textPrimary },
  clearButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
  },
  clearText: { fontSize: TYPOGRAPHY.body, fontWeight: 'bold', color: COLORS.textPrimary },
  pressed: { opacity: 0.7 },
  list: { padding: SPACING.lg, flexGrow: 1 },
  separator: { height: SPACING.md },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  emptyTitle: { fontSize: TYPOGRAPHY.heading, fontWeight: 'bold', color: COLORS.textPrimary },
  emptyText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});

export default SavedScreen;