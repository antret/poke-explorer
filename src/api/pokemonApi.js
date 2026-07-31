const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'

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

  return response.json()
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