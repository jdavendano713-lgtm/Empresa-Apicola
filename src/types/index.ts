export type HiveStatus = 'Activa' | 'En revisión' | 'Inactiva';

export interface Hive {
  id: string;
  name: string;
  location: string;
  status: HiveStatus;
  technician: string;
  imageUrl: string;
}
