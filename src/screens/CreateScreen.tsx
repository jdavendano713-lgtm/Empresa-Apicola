import React from 'react';
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
import { useCreateItem } from '../hooks/useCreateItem';
import { RootStackParamList } from '../navigation/types';
import { hiveFormSchema, ItemFormData, ItemFormInput } from '../schemas/itemSchema';
import { HiveStatus } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type CreateScreenProps = NativeStackScreenProps<RootStackParamList, 'Create'>;

const STATUS_OPTIONS: HiveStatus[] = [
  HiveStatus.Active,
  HiveStatus.InReview,
  HiveStatus.Inactive,
];

const CreateScreen: React.FC<CreateScreenProps> = ({ navigation }) => {
  const { mutate, isPending } = useCreateItem();

  const {
    control,
    handleSubmit,
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

  const selectedStatus = watch('status');
  const busy = isPending || isSubmitting;

  const onSubmit = (values: ItemFormData): void => {
    mutate(
      {
        name: values.name,
        location: values.location,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: (err) => {
          Alert.alert('Error al crear colmena', err.message);
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
        <Text style={styles.title}>Registrar nueva colmena</Text>

        <FormField
          control={control}
          name="name"
          label="Nombre de la colmena"
          placeholder="Ej. Colmena Flor de Café"
          editable={!busy}
        />

        <FormField
          control={control}
          name="location"
          label="Ubicación / Apiario"
          placeholder="Ej. Vereda La Cumbre - Lote 2"
          editable={!busy}
        />

        <FormField
          control={control}
          name="technician"
          label="Técnico asignado"
          placeholder="Ej. Tatiana Ramos"
          editable={!busy}
        />

        <FormField
          control={control}
          name="honeyKg"
          label="Producción estimada (kg)"
          placeholder="Ej. 15"
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
            <Text style={styles.submitText}>Guardar colmena</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
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
  statusText: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
  },
  statusTextActive: {
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  submitText: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});

export default CreateScreen;