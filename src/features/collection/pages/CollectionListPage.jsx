import { Link } from 'react-router'

import {
  ErrorState,
  LoadingState,
} from '../../../components/PageState'
import { useCollectionItems } from '../hooks/useCollectionItems'

function CollectionListPage() {
  const {
    data: collectionItems = [],
    isPending,
    isError,
    error,
  } = useCollectionItems()

  if (isPending) {
    return (
      <LoadingState message="Cargando colección..." />
    )
  }

  if (isError) {
    return (
      <ErrorState
        message={error.message}
        backTo="/"
        backLabel="Volver al inicio"
      />
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
              Nivel 3
            </p>

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Mi colección Pokémon
            </h1>

            <p className="mt-2 text-slate-600">
              Administra los Pokémon guardados en tu
              colección.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Volver al inicio
            </Link>

            <Link
              to="/collection/new"
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Agregar Pokémon
            </Link>
          </div>
        </header>

        {collectionItems.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">
              Tu colección está vacía
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Agrega tu primer Pokémon y registra su apodo,
              rol y notas dentro del equipo.
            </p>

            <Link
              to="/collection/new"
              className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Agregar primer Pokémon
            </Link>
          </section>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collectionItems.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <article className="flex h-full flex-col p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                    {item.pokemonName}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {item.nickname}
                  </h2>

                  <span className="mt-3 w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {item.role}
                  </span>

                  <p className="mt-4 flex-1 text-slate-600">
                    {item.notes}
                  </p>

                  <Link
                    to={`/collection/${item.id}`}
                    className="mt-6 text-center font-semibold text-red-600 transition hover:text-red-700"
                  >
                    Ver detalle
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default CollectionListPage