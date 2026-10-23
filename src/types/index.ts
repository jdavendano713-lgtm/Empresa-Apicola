export enum HiveStatus {
  Active = 'Activa',
  InReview = 'En revisión',
  Inactive = 'Inactiva',
}

export interface Hive {
  id: string;
  name: string;
  location: string;
  status: HiveStatus;
  technician: string;
  honeyKg: number;
}