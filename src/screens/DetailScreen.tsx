import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useItemById } from '../hooks/useItemById';
import { useSavedStore } from '../stores/savedStore';
import { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { data: hive, isLoading, isError, error, refetch } = useItemById(itemId);

  const isSaved = useSavedStore((state) =>
    state.savedItems.some((item) => item.id === itemId),
  );
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primaryDark} />
      </View>
    );
  }

  if (isError || !hive) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>⚠️ No se pudo cargar</Text>
        <Text style={styles.value}>{error ? error.message : 'Colmena no encontrada'}</Text>
        <Pressable
          onPress={() => refetch()}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const handleToggleSaved = (): void => {
    if (isSaved) {
      removeItem(hive.id);
    } else {
      addItem(hive);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{hive.name}</Text>
      <Text style={styles.label}>Ubicación</Text>
      <Text style={styles.value}>{hive.location}</Text>
      <Text style={styles.label}>Estado</Text>
      <Text style={styles.value}>{hive.status}</Text>
      <Text style={styles.label}>Técnico a cargo</Text>
      <Text style={styles.value}>{hive.technician}</Text>
      <Text style={styles.label}>Producción de miel</Text>
      <Text style={styles.value}>{hive.honeyKg} kg</Text>

      <Pressable
        onPress={handleToggleSaved}
        style={({ pressed }) => [styles.saveButton, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>
          {isSaved ? '★ Quitar de guardados' : '☆ Guardar colmena'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Volver a la lista</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  value: {
    fontSize: TYPOGRAPHY.heading,
    color: COLORS.textPrimary,
  },
  saveButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});

export default DetailScreen;