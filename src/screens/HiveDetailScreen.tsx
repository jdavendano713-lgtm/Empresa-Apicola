import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { hives } from '../data/mockData';
import { RootStackParamList } from '../types/navigation';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

const HiveDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'HiveDetail'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'HiveDetail'>>();

  const hive = hives.find((h) => h.id === route.params.hiveId);

  if (!hive) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Colmena no encontrada</Text>
      </View>
    );
  }

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
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  buttonText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});

export default HiveDetailScreen;