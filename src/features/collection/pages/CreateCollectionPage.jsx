import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

import CollectionForm from '../components/CollectionForm'
import { useCreateCollectionItem } from '../hooks/useCreateCollectionItem'

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
    'No se pudo agregar el Pokémon a la colección.'
  )
}

function CreateCollectionPage() {
  const navigate = useNavigate()

  const {
    mutateAsync: createItem,
    isPending,
  } = useCreateCollectionItem()

  async function handleCreate(formValues) {
    try {
      await createItem(formValues)

      toast.success(
        'Pokémon agregado correctamente a la colección',
      )

      navigate('/collection')
    } catch (error) {
      toast.error(getRequestErrorMessage(error))
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-2xl">
        <Link
          to="/collection"
          className="mb-6 inline-block font-semibold text-red-600 transition hover:text-red-700"
        >
          ← Volver a la colección
        </Link>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
              Nuevo registro
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Agregar Pokémon
            </h1>

            <p className="mt-2 text-slate-600">
              Selecciona un Pokémon y registra su función
              dentro de tu colección.
            </p>
          </header>

          <CollectionForm
            onSubmit={handleCreate}
            submitLabel="Agregar a la colección"
            isSubmitting={isPending}
          />
        </article>
      </section>
    </main>
  )
}

export default CreateCollectionPage