import { useQuery } from '@tanstack/react-query'

import { getCollectionItemById } from '../api/collectionApi'

export function useCollectionItem(id) {
  return useQuery({
    queryKey: ['collection', 'detail', id],
    queryFn: () => getCollectionItemById(id),
    enabled: Boolean(id),
  })
}