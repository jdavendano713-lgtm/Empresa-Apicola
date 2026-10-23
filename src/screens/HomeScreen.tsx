import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HivesList'>;import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ItemCard from '../components/ItemCard';
import { hives } from '../data/mockData';
import { Hive } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [query, setQuery] = useState<string>('');

  const filteredHives = useMemo<Hive[]>(() => {
    const text = query.trim().toLowerCase();
    if (text === '') {
      return hives;
    }
    return hives.filter(
      (hive) =>
        hive.name.toLowerCase().includes(text) ||
        hive.location.toLowerCase().includes(text) ||
        hive.technician.toLowerCase().includes(text) ||
        hive.status.toLowerCase().includes(text),
    );
  }, [query]);

  const handlePress = useCallback(
  (item: Hive): void => {
    navigation.navigate('HiveDetail', { hiveId: item.id });
  },
  [navigation],
);

  const renderItem = useCallback<ListRenderItem<Hive>>(
    ({ item }) => <ItemCard item={item} onPress={handlePress} />,
    [handlePress],
  );

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🐝 Empresa Apícola</Text>
          <Text style={styles.headerSubtitle}>
            {filteredHives.length} colmenas encontradas
          </Text>
        </View>
        <TextInput
          style={styles.search}
          placeholder="Buscar por nombre, ubicación, técnico o estado..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <FlatList<Hive>
          data={filteredHives}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>🍯 Sin resultados</Text>
              <Text style={styles.emptyText}>
                No encontramos colmenas que coincidan con "{query}".
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.subtitle,
    color: COLORS.textPrimary,
  },
  search: {
    backgroundColor: COLORS.surface,
    margin: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  separator: {
    height: SPACING.md,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
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
});

export default HomeScreen;