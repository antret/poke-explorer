import { useQuery } from '@tanstack/react-query'

import { getPokemons } from '../../../api/pokemonApi'

const POKEMON_LIMIT = 151

export function usePokemonOptions() {
  return useQuery({
    queryKey: ['pokemon-options'],
    queryFn: () =>
      getPokemons({
        page: 1,
        limit: POKEMON_LIMIT,
      }),
    select: (data) => data.results,
    staleTime: 1000 * 60 * 10,
  })
}