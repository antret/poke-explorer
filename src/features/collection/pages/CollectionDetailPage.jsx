import { useQuery } from '@tanstack/react-query'
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router'
import { toast } from 'sonner'

import { getPokemonByName } from '../../../api/pokemonApi'
import {
  ErrorState,
  LoadingState,
} from '../../../components/PageState'
import { useCollectionItem } from '../hooks/useCollectionItem'
import { useDeleteCollectionItem } from '../hooks/useDeleteCollectionItem'
import { getRequestErrorMessage } from '../utils/getRequestErrorMessage'

function CollectionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: collectionItem,
    isPending: isCollectionPending,
    isError: isCollectionError,
    error: collectionError,
  } = useCollectionItem(id)

  const {
    mutateAsync: deleteItem,
    isPending: isDeleting,
  } = useDeleteCollectionItem()

  const {
    data: pokemon,
    isPending: isPokemonPending,
    isError: isPokemonError,
    error: pokemonError,
  } = useQuery({
    queryKey: [
      'pokemon',
      'collection-detail',
      collectionItem?.pokemonName,
    ],
    queryFn: () =>
      getPokemonByName(collectionItem.pokemonName),
    enabled: Boolean(collectionItem?.pokemonName),
  })

  async function handleDelete() {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar a ${collectionItem.nickname} de tu colección?`,
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteItem(id)

      toast.success(
        'Pokémon eliminado correctamente de la colección',
      )

      navigate('/collection', {
        replace: true,
      })
    } catch (error) {
      toast.error(
        getRequestErrorMessage(
          error,
          'No se pudo eliminar el Pokémon de la colección.',
        ),
      )
    }
  }

  if (
    isCollectionPending ||
    (collectionItem && isPokemonPending)
  ) {
    return (
      <LoadingState message="Cargando detalle de la colección..." />
    )
  }

  if (isCollectionError) {
    return (
      <ErrorState
        message={collectionError.message}
        backTo="/collection"
        backLabel="Volver a la colección"
      />
    )
  }

  if (isPokemonError) {
    return (
      <ErrorState
        message={pokemonError.message}
        backTo="/collection"
        backLabel="Volver a la colección"
      />
    )
  }

  const pokemonImage =
    pokemon?.sprites?.other?.['official-artwork']
      ?.front_default ??
    pokemon?.sprites?.front_default

  const pokemonTypes =
    pokemon?.types?.map(
      (typeItem) => typeItem.type.name,
    ) ?? []

  const pokemonAbilities =
    pokemon?.abilities?.map(
      (abilityItem) => abilityItem.ability.name,
    ) ?? []

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/collection"
            className="font-semibold text-red-600 transition hover:text-red-700"
          >
            ← Volver a la colección
          </Link>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/collection/${id}/edit`}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Editar registro
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isDeleting
                ? 'Eliminando...'
                : 'Eliminar registro'}
            </button>
          </div>
        </div>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <section className="flex items-center justify-center bg-gradient-to-br from-red-50 to-slate-100 p-8">
              {pokemonImage ? (
                <img
                  src={pokemonImage}
                  alt={`Imagen de ${collectionItem.pokemonName}`}
                  className="h-64 w-64 object-contain md:h-80 md:w-80"
                />
              ) : (
                <p className="text-slate-500">
                  Imagen no disponible
                </p>
              )}
            </section>

            <section className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                {collectionItem.pokemonName}
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                {collectionItem.nickname}
              </h1>

              <span className="mt-4 inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                {collectionItem.role}
              </span>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Notas del entrenador
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {collectionItem.notes}
                </p>
              </section>

              <section className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Altura
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {pokemon.height / 10} m
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Peso
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {pokemon.weight / 10} kg
                  </p>
                </div>
              </section>
            </section>
          </div>

          <section className="grid grid-cols-1 gap-6 border-t border-slate-200 p-6 sm:p-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Tipos
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {pokemonTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-red-100 px-4 py-2 font-semibold capitalize text-red-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Habilidades
              </h2>

              <ul className="mt-4 space-y-2">
                {pokemonAbilities.map((ability) => (
                  <li
                    key={ability}
                    className="capitalize text-slate-700"
                  >
                    • {ability.replaceAll('-', ' ')}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </section>
    </main>
  )
}

export default CollectionDetailPage