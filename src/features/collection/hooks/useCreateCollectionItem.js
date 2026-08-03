import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { createCollectionItem } from '../api/collectionApi'

export function useCreateCollectionItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['collection', 'create'],
    mutationFn: createCollectionItem,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['collection'],
      })
    },
  })
}