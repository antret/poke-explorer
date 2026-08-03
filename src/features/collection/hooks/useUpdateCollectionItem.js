import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { updateCollectionItem } from '../api/collectionApi'

export function useUpdateCollectionItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['collection', 'update'],
    mutationFn: updateCollectionItem,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['collection'],
      })
    },
  })
}