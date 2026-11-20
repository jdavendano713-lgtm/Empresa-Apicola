import { z } from 'zod';
import { HiveStatus } from '../types';

export const hiveFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre de la colmena debe tener al menos 3 caracteres'),
  location: z
    .string()
    .trim()
    .min(3, 'La ubicación debe tener al menos 3 caracteres'),
  technician: z
    .string()
    .trim()
    .min(2, 'Indica el nombre del técnico a cargo'),
  status: z.nativeEnum(HiveStatus),
  honeyKg: z.coerce
    .number('Ingresa un número válido en kg')
    .min(0, 'La producción de miel no puede ser negativa'),
});

export type ItemFormInput = z.input<typeof hiveFormSchema>;
export type ItemFormData = z.infer<typeof hiveFormSchema>;