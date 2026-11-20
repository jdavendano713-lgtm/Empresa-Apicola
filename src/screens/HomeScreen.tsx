import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ItemCard from '../components/ItemCard';
import { useItems } from '../hooks/useItems';
import { MainTabParamList, RootStackParamList } from '../navigation/types';
import { Hive } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ItemSeparator: React.FC = () => <View style={styles.separator} />;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [query, setQuery] = useState<string>('');
  const { data, isLoading, isError, error, refetch, isFetching } = useItems();

  const filteredHives = useMemo<Hive[]>(() => {
    const hives = data ?? [];
    const text = query.trim().toLowerCase();
    if (text === '') {
      return hives;
    }
    return hives.filter(
      (hive) =>
        hive.name.toLowerCase().includes(text) ||
        hive.location.toLowerCase().includes(text) ||
        hive.technician.toLowerCase().includes(text) ||
        String(hive.status).toLowerCase().includes(text),
    );
  }, [data, query]);

  const handlePress = useCallback(
    (item: Hive): void => {
      navigation.navigate('Detail', { itemId: item.id, itemName: item.name });
    },
    [navigation],
  );

  const renderItem = useCallback<ListRenderItem<Hive>>(
    ({ item }) => <ItemCard item={item} onPress={handlePress} />,
    [handlePress],
  );

  const renderBody = (): React.JSX.Element => {
    if (isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primaryDark} />
          <Text style={styles.centerText}>Cargando colmenas...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorTitle}>⚠️ No se pudo cargar</Text>
          <Text style={styles.centerText}>{error.message}</Text>
          <Pressable
            onPress={() => refetch()}
            style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}
          >
            <Text style={styles.retryText}>Reintentar</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <FlatList<Hive>
        data={filteredHives}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        refreshing={isFetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.errorTitle}>🍯 Sin resultados</Text>
            <Text style={styles.centerText}>
              {query === ''
                ? 'Aún no hay colmenas registradas.'
                : `No encontramos colmenas que coincidan con "${query}".`}
            </Text>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>🐝 Empresa Apícola</Text>
            <Text style={styles.headerSubtitle}>
              {filteredHives.length} colmenas encontradas
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Create')}
            style={({ pressed }) => [styles.addButton, pressed && styles.addPressed]}
          >
            <Text style={styles.addText}>+ Nueva</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.search}
          placeholder="Buscar por nombre, ubicación, técnico o estado..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        {renderBody()}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  headerText: {
    flex: 1,
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
  addButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
  },
  addPressed: {
    opacity: 0.7,
  },
  addText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  centerText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  retry: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    marginTop: SPACING.lg,
  },
  retryPressed: {
    opacity: 0.7,
  },
  retryText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});

export default HomeScreen;