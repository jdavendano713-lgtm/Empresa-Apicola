import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Hive, UpdateHivePayload } from '../types';
import { ITEMS_QUERY_KEY } from './useItems';

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation<Hive, Error, UpdateHivePayload>({
    mutationFn: async (payload: UpdateHivePayload): Promise<Hive> => {
      const { data } = await api.put<Hive>(`/hives/${payload.id}`, payload);
      return data;
    },
    onSuccess: async (updatedHive) => {
      await queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, updatedHive.id] });
    },
  });
}