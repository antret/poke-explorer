import { useQuery } from '@tanstack/react-query'

import { getCollectionItems } from '../api/collectionApi'

export function useCollectionItems() {
  return useQuery({
    queryKey: ['collection'],
    queryFn: getCollectionItems,
  })
}