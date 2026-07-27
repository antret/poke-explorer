import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getPokemons } from '../api/pokemonApi'
import PokemonListSkeleton from '../components/PokemonListSkeleton'

function PokemonListPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemons', 1],
    queryFn: () =>
      getPokemons({
        page: 1,
        limit: 20,
      }),
  })

  const filteredPokemons =
    data?.results.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()),
    ) ?? []

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-center text-lg text-red-600">
          {error.message}
        </p>
      </main>
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
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none focus:border-red-500"
          />
        </div>

        {isPending ? (
          <PokemonListSkeleton />
        ) : filteredPokemons.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPokemons.map((pokemon) => (
              <li
                key={pokemon.name}
                className="rounded-xl bg-white p-5 text-center shadow"
              >
                <p className="font-semibold capitalize text-slate-800">
                  {pokemon.name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-slate-600">
            No se encontraron Pokémon.
          </p>
        )}
      </section>
    </main>
  )
}

export default PokemonListPage