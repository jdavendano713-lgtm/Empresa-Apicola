import { Hive, HiveStatus } from '../types';

export const hives: Hive[] = [
  { id: '1', name: 'Colmena Reina Dorada', location: 'El Mirador - Norte', status: HiveStatus.Active, technician: 'Sandy Suaza', honeyKg: 18 },
  { id: '2', name: 'Colmena Flor de Miel', location: 'Los Cedros - Sur', status: HiveStatus.InReview, technician: 'Sandy Suaza', honeyKg: 12 },
  { id: '3', name: 'Colmena Abeja Real', location: 'La Pradera - Este', status: HiveStatus.Active, technician: 'Andrés Rojas', honeyKg: 22 },
  { id: '4', name: 'Colmena Néctar', location: 'El Mirador - Oeste', status: HiveStatus.Inactive, technician: 'Sandy Suaza', honeyKg: 0 },
  { id: '5', name: 'Colmena Girasol', location: 'La Pradera - Norte', status: HiveStatus.Active, technician: 'Sandy Suaza', honeyKg: 15 },
  { id: '6', name: 'Colmena Panal Fuerte', location: 'Los Cedros - Norte', status: HiveStatus.Active, technician: 'Andrés Rojas', honeyKg: 20 },
  { id: '7', name: 'Colmena Zumbido', location: 'El Mirador - Centro', status: HiveStatus.InReview, technician: 'Sandy Suaza', honeyKg: 9 },
  { id: '8', name: 'Colmena Azahar', location: 'La Pradera - Sur', status: HiveStatus.Active, technician: 'Sandy Suaza', honeyKg: 17 },
  { id: '9', name: 'Colmena Lavanda', location: 'Los Cedros - Este', status: HiveStatus.Inactive, technician: 'Andrés Rojas', honeyKg: 3 },
  { id: '10', name: 'Colmena Trébol', location: 'El Mirador - Sur', status: HiveStatus.Active, technician: 'Sandy Suaza', honeyKg: 14 },
  { id: '11', name: 'Colmena Eucalipto', location: 'La Pradera - Oeste', status: HiveStatus.InReview, technician: 'Sandy Suaza', honeyKg: 11 },
  { id: '12', name: 'Colmena Romero', location: 'Los Cedros - Oeste', status: HiveStatus.Active, technician: 'Andrés Rojas', honeyKg: 19 },
];