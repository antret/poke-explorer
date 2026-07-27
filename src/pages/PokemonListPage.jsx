import { useQuery } from '@tanstack/react-query'

import { getPokemons } from '../api/pokemonApi'
import PokemonListSkeleton from '../components/PokemonListSkeleton'

function PokemonListPage() {
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

        {isPending ? (
          <PokemonListSkeleton />
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.results.map((pokemon) => (
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
        )}
      </section>
    </main>
  )
}

export default PokemonListPage