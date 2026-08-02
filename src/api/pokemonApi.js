const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'

const POKEMON_ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

const delay = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export async function getPokemons({ page = 1, limit = 20 }) {
  await delay(1200)

  const offset = (page - 1) * limit

  const response = await fetch(
    `${POKE_API_URL}?limit=${limit}&offset=${offset}`,
  )

  if (!response.ok) {
    throw new Error('No se pudieron obtener los Pokémon')
  }

  const data = await response.json()

  const results = data.results.map((pokemon) => {
    const urlParts = pokemon.url.split('/').filter(Boolean)
    const id = Number(urlParts[urlParts.length - 1])

    return {
      ...pokemon,
      id,
      image: `${POKEMON_ARTWORK_URL}/${id}.png`,
    }
  })

  return {
    ...data,
    results,
  }
}

export async function getPokemonByName(name) {
  const normalizedName = name.trim().toLowerCase()

  const response = await fetch(
    `${POKE_API_URL}/${encodeURIComponent(normalizedName)}`,
  )

  if (!response.ok) {
    throw new Error('No se pudo obtener el detalle del Pokémon')
  }

  return response.json()
}