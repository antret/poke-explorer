import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { deleteCollectionItem } from '../api/collectionApi'

export function useDeleteCollectionItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['collection', 'delete'],
    mutationFn: deleteCollectionItem,

    onSuccess: async (_, deletedId) => {
      queryClient.removeQueries({
        queryKey: [
          'collection',
          'detail',
          deletedId,
        ],
        exact: true,
      })

      await queryClient.invalidateQueries({
        queryKey: ['collection'],
        exact: true,
      })
    },
  })
}