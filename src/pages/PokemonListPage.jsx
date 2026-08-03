import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

import { getPokemons } from '../api/pokemonApi'
import { ErrorState } from '../components/PageState'
import PokemonListSkeleton from '../components/PokemonListSkeleton'

const ITEMS_PER_PAGE = 20

function PokemonListPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () =>
      getPokemons({
        page,
        limit: ITEMS_PER_PAGE,
      }),
  })

  const filteredPokemons =
    data?.results.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()),
    ) ?? []

  const totalPages = data
    ? Math.ceil(data.count / ITEMS_PER_PAGE)
    : 0

  if (isError) {
    return (
      <ErrorState
        message={error.message}
        backTo="/"
        backLabel="Volver a intentar"
      />
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-600">
            PokéExplorer
          </h1>

          <p className="mt-2 text-slate-600">
            Explora los Pokémon disponibles en PokeAPI
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/collection"
              className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
            >
              Mi colección
            </Link>

            <Link
              to="/posts/nuevo"
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Crear publicación
            </Link>
          </div>
        </header>

        <div className="mx-auto mb-8 max-w-md">
          <label
            htmlFor="pokemon-search"
            className="sr-only"
          >
            Buscar Pokémon
          </label>

          <input
            id="pokemon-search"
            type="search"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Buscar Pokémon por nombre"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>

        {isPending ? (
          <PokemonListSkeleton />
        ) : filteredPokemons.length > 0 ? (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="block h-full p-5"
                >
                  <div className="relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-slate-100">
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm">
                      #{String(pokemon.id).padStart(3, '0')}
                    </span>

                    <img
                      src={pokemon.image}
                      alt={`Imagen de ${pokemon.name}`}
                      loading="lazy"
                      className="h-32 w-32 object-contain transition duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p className="text-center text-lg font-bold capitalize text-slate-800">
                    {pokemon.name}
                  </p>

                  <p className="mt-1 text-center text-sm font-medium text-red-600">
                    Ver detalles
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-slate-600">
            No se encontraron Pokémon.
          </p>
        )}

        {!isPending && data && (
          <nav
            aria-label="Paginación de Pokémon"
            className="mt-8 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => currentPage - 1)
              }
              disabled={!data.previous}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Anterior
            </button>

            <span className="text-sm font-medium text-slate-700">
              Página {page} de {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => currentPage + 1)
              }
              disabled={!data.next}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Siguiente
            </button>
          </nav>
        )}
      </section>
    </main>
  )
}

export default PokemonListPage