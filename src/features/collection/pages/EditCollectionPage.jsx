import { useMemo } from 'react'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router'
import { toast } from 'sonner'

import CollectionForm from '../components/CollectionForm'
import { useCollectionItem } from '../hooks/useCollectionItem'
import { useUpdateCollectionItem } from '../hooks/useUpdateCollectionItem'

function getRequestErrorMessage(error) {
  const responseData = error.response?.data

  if (typeof responseData === 'string') {
    return responseData
  }

  if (typeof responseData?.message === 'string') {
    return responseData.message
  }

  return (
    error.message ||
    'No se pudo actualizar el Pokémon de la colección.'
  )
}

function EditCollectionPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: collectionItem,
    isPending: isCollectionPending,
    isError: isCollectionError,
    error: collectionError,
  } = useCollectionItem(id)

  const {
    mutateAsync: updateItem,
    isPending: isUpdating,
  } = useUpdateCollectionItem()

  const initialValues = useMemo(() => {
    if (!collectionItem) {
      return undefined
    }

    return {
      pokemonId: collectionItem.pokemonId,
      pokemonName: collectionItem.pokemonName,
      nickname: collectionItem.nickname,
      role: collectionItem.role,
      notes: collectionItem.notes,
    }
  }, [collectionItem])

  async function handleUpdate(formValues) {
    try {
      await updateItem({
        id,
        collectionItem: formValues,
      })

      toast.success(
        'Pokémon actualizado correctamente',
      )

      navigate(`/collection/${id}`)
    } catch (error) {
      toast.error(getRequestErrorMessage(error))
    }
  }

  if (isCollectionPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-lg font-medium text-slate-600">
          Cargando información del Pokémon...
        </p>
      </main>
    )
  }

  if (isCollectionError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 px-4">
        <p className="text-center text-lg font-medium text-red-600">
          {collectionError.message}
        </p>

        <Link
          to="/collection"
          className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
        >
          Volver a la colección
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <Link
          to={`/collection/${id}`}
          className="mb-6 inline-block font-semibold text-red-600 transition hover:text-red-700"
        >
          ← Volver al detalle
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
              Editar registro
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Actualizar Pokémon
            </h1>

            <p className="mt-2 text-slate-600">
              Modifica el Pokémon, su apodo, su rol o
              las notas de la colección.
            </p>
          </header>

          <CollectionForm
            initialValues={initialValues}
            onSubmit={handleUpdate}
            submitLabel="Guardar cambios"
            isSubmitting={isUpdating}
          />
        </article>
      </section>
    </main>
  )
}

export default EditCollectionPage