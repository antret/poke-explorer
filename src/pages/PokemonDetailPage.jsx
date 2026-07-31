import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'

import { getPokemonByName } from '../api/pokemonApi'

function PokemonDetailPage() {
  const { name } = useParams()

  const {
    data: pokemon,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemonByName(name),
  })

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-lg text-slate-600">
          Cargando detalle del Pokémon...
        </p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 px-4">
        <p className="text-center text-lg text-red-600">
          {error.message}
        </p>

        <Link
          to="/"
          className="font-semibold text-red-600 hover:underline"
        >
          Volver al listado
        </Link>
      </main>
    )
  }

  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default
    ?? pokemon.sprites.front_default

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <section className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-block font-semibold text-red-600 hover:underline"
        >
          ← Volver al listado
        </Link>

        <article className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <img
                src={imageUrl}
                alt={pokemon.name}
                className="h-64 w-64 object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Pokémon #{pokemon.id}
              </p>

              <h1 className="mt-1 text-4xl font-bold capitalize text-red-600">
                {pokemon.name}
              </h1>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Altura
                  </p>

                  <p className="font-semibold text-slate-800">
                    {pokemon.height / 10} m
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Peso
                  </p>

                  <p className="font-semibold text-slate-800">
                    {pokemon.weight / 10} kg
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-800">
                  Tipos
                </h2>

                <div className="mt-2 flex flex-wrap gap-2">
                  {pokemon.types.map(({ type }) => (
                    <span
                      key={type.name}
                      className="rounded-full bg-red-100 px-3 py-1 font-semibold capitalize text-red-700"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-800">
                  Habilidades
                </h2>

                <ul className="mt-2 list-inside list-disc text-slate-700">
                  {pokemon.abilities.map(({ ability }) => (
                    <li
                      key={ability.name}
                      className="capitalize"
                    >
                      {ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-800">
              Estadísticas base
            </h2>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {pokemon.stats.map(({ base_stat: baseStat, stat }) => (
                <li
                  key={stat.name}
                  className="flex justify-between rounded-xl bg-slate-100 p-4"
                >
                  <span className="font-semibold capitalize text-slate-700">
                    {stat.name}
                  </span>

                  <span className="font-bold text-red-600">
                    {baseStat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </main>
  )
}

export default PokemonDetailPage