import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface FormFieldProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> {
  control: Control<TFieldValues, TContext, TTransformedValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  editable?: boolean;
}

export function FormField<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  editable = true,
}: FormFieldProps<TFieldValues, TContext, TTransformedValues>): React.JSX.Element {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                !editable && styles.inputDisabled,
                error && styles.inputError,
              ]}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textSecondary}
              value={value === undefined || value === null ? '' : String(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType={keyboardType}
              editable={editable}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.danger,
    marginTop: SPACING.sm,
  },
});