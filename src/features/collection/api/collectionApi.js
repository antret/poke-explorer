import apiClient from '../../../lib/apiClient'

const COLLECTION_ENDPOINT = '/collection'

export async function getCollectionItems() {
  const response = await apiClient.get(COLLECTION_ENDPOINT)

  return response.data
}

export async function getCollectionItemById(id) {
  const response = await apiClient.get(
    `${COLLECTION_ENDPOINT}/${encodeURIComponent(id)}`,
  )

  return response.data
}

export async function createCollectionItem(collectionItem) {
  const response = await apiClient.post(
    COLLECTION_ENDPOINT,
    collectionItem,
  )

  return response.data
}

export async function updateCollectionItem({
  id,
  collectionItem,
}) {
  const response = await apiClient.put(
    `${COLLECTION_ENDPOINT}/${encodeURIComponent(id)}`,
    collectionItem,
  )

  return response.data
}

export async function deleteCollectionItem(id) {
  const response = await apiClient.delete(
    `${COLLECTION_ENDPOINT}/${encodeURIComponent(id)}`,
  )

  return response.data
}