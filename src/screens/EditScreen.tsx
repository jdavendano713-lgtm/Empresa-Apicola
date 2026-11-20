import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from '../components/FormField';
import { useItemById } from '../hooks/useItemById';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { RootStackParamList } from '../navigation/types';
import { hiveFormSchema, ItemFormData, ItemFormInput } from '../schemas/itemSchema';
import { HiveStatus } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type EditScreenProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;

const STATUS_OPTIONS: HiveStatus[] = [
  HiveStatus.Active,
  HiveStatus.InReview,
  HiveStatus.Inactive,
];

const EditScreen: React.FC<EditScreenProps> = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { data: hive, isLoading, isError, error, refetch } = useItemById(itemId);
  const { mutate, isPending } = useUpdateItem();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<ItemFormInput, unknown, ItemFormData>({
    resolver: zodResolver(hiveFormSchema),
    defaultValues: {
      name: '',
      location: '',
      technician: '',
      status: HiveStatus.Active,
      honeyKg: 0,
    },
  });

  useEffect(() => {
    if (hive) {
      reset({
        name: hive.name,
        location: hive.location,
        technician: hive.technician,
        status: hive.status,
        honeyKg: hive.honeyKg,
      });
    }
  }, [hive, reset]);

  const selectedStatus = watch('status');
  const busy = isPending || isSubmitting;

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
        <Text style={styles.centerText}>{error ? error.message : 'Colmena no encontrada'}</Text>
        <Pressable onPress={() => refetch()} style={styles.submitButton}>
          <Text style={styles.submitText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const onSubmit = (values: ItemFormData): void => {
    mutate(
      {
        id: hive.id,
        name: values.name,
        location: values.location,
        technician: values.technician,
        status: values.status,
        honeyKg: values.honeyKg,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: (err) => {
          Alert.alert('Error al actualizar', err.message);
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar colmena</Text>

        <FormField control={control} name="name" label="Nombre de la colmena" editable={!busy} />
        <FormField control={control} name="location" label="Ubicación / Apiario" editable={!busy} />
        <FormField control={control} name="technician" label="Técnico asignado" editable={!busy} />
        <FormField
          control={control}
          name="honeyKg"
          label="Producción de miel (kg)"
          keyboardType="numeric"
          editable={!busy}
        />

        <Text style={styles.label}>Estado de la colmena</Text>
        <View style={styles.statusRow}>
          {STATUS_OPTIONS.map((option) => {
            const active = selectedStatus === option;
            return (
              <Pressable
                key={option}
                disabled={busy}
                onPress={() => setValue('status', option, { shouldValidate: true })}
                style={[styles.statusChip, active && styles.statusChipActive]}
              >
                <Text style={[styles.statusText, active && styles.statusTextActive]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={busy}
          onPress={() => {
            void handleSubmit(onSubmit)();
          }}
          style={({ pressed }) => [
            styles.submitButton,
            busy && styles.buttonDisabled,
            pressed && !busy && styles.buttonPressed,
          ]}
        >
          {busy ? (
            <ActivityIndicator size="small" color={COLORS.textPrimary} />
          ) : (
            <Text style={styles.submitText}>Guardar cambios</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  centerText: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  statusChip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
  },
  statusChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  statusText: { fontSize: TYPOGRAPHY.caption, color: COLORS.textPrimary },
  statusTextActive: { fontWeight: 'bold' },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonPressed: { opacity: 0.75 },
  submitText: { fontSize: TYPOGRAPHY.body, fontWeight: 'bold', color: COLORS.textPrimary },
});

export default EditScreen;