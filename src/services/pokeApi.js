import { cacheService } from './cacheService'
import { Pokemon } from '../models/Pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

async function fetchWithCache(url, cacheKey) {
  const cached = cacheService.get(cacheKey)
  if (cached) return cached

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data = await response.json()
  cacheService.set(cacheKey, data)
  return data
}

export async function getPokemonDetails(nameOrId) {
  const key = String(nameOrId).toLowerCase()
  return fetchWithCache(`${BASE_URL}/pokemon/${key}`, `pokemon_${key}`)
}

export async function getPokemonSpecies(nameOrId) {
  const key = String(nameOrId).toLowerCase()
  return fetchWithCache(`${BASE_URL}/pokemon-species/${key}`, `species_${key}`)
}

export async function getFullPokemonData(nameOrId) {
  const key = String(nameOrId).toLowerCase()
  const cached = cacheService.get(`full_${key}`)
  if (cached) {
    return cached instanceof Pokemon ? cached : new Pokemon(cached)
  }

  const [details, species] = await Promise.all([
    getPokemonDetails(nameOrId),
    getPokemonSpecies(nameOrId).catch(() => null)
  ])

  let evolutions = []
  if (species?.evolution_chain?.url) {
    try {
      const chainData = await fetchWithCache(species.evolution_chain.url, `chain_${species.evolution_chain.url}`)
      const extractEvos = (node) => {
        const list = [node.species.name]
        node.evolves_to.forEach(child => list.push(...extractEvos(child)))
        return list
      }
      const names = extractEvos(chainData.chain)
      evolutions = await Promise.all(
        names.map(n => getPokemonDetails(n).then(d => ({
          id: d.id,
          name: d.name,
          sprite: d.sprites.other?.['official-artwork']?.front_default || d.sprites.front_default
        })))
      )
    } catch {
      evolutions = []
    }
  }

  const pokemon = Pokemon.fromApiResponse(details, species, evolutions)
  cacheService.set(`full_${key}`, pokemon)
  return pokemon
}
