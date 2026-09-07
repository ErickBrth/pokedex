import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getPokemonDetails, getPokemonSpecies, getFullPokemonData } from '../../services/pokeApi'
import { cacheService } from '../../services/cacheService'
import { Pokemon } from '../../models/Pokemon'
import {
  createPokemon,
  createRawPokeApiDetails,
  createRawPokeApiSpecies,
} from '../factories/pokemonFactory'

describe('pokeApi service', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('getPokemonDetails', () => {
    it('fetches and returns pokemon details from network', async () => {
      const mockData = createRawPokeApiDetails()
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const data = await getPokemonDetails('pikachu')
      expect(data).toEqual(mockData)
      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu')
    })

    it('returns cached data without second network call', async () => {
      const mockData = createRawPokeApiDetails()
      cacheService.set('pokemon_pikachu', mockData)
      const fetchSpy = vi.spyOn(globalThis, 'fetch')

      const data = await getPokemonDetails('pikachu')
      expect(data).toEqual(mockData)
      expect(fetchSpy).not.toHaveBeenCalled()
    })

    it('throws when HTTP status is not ok', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await expect(getPokemonDetails('unknown-pokemon')).rejects.toThrow('Request failed with status 404')
    })
  })

  describe('getPokemonSpecies', () => {
    it('fetches species data successfully', async () => {
      const mockSpecies = createRawPokeApiSpecies()
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockSpecies,
      })

      const data = await getPokemonSpecies(25)
      expect(data).toEqual(mockSpecies)
      expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/25')
    })
  })

  describe('getFullPokemonData', () => {
    it('fetches details and species and returns a Pokemon instance', async () => {
      const mockDetails = createRawPokeApiDetails()
      const mockSpecies = createRawPokeApiSpecies()

      vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
        if (String(url).includes('/pokemon-species/')) {
          return { ok: true, json: async () => mockSpecies }
        }
        return { ok: true, json: async () => mockDetails }
      })

      const pokemon = await getFullPokemonData('pikachu')

      expect(pokemon).toBeInstanceOf(Pokemon)
      expect(pokemon.id).toBe(25)
      expect(pokemon.name).toBe('pikachu')
      expect(pokemon.colorName).toBe('yellow')
      expect(pokemon.displayName).toBe('Pikachu')
    })

    it('returns cached Pokemon instance directly on subsequent calls', async () => {
      const mockPokemon = createPokemon({
        id: 25,
        name: 'pikachu',
        colorName: 'yellow',
        sprites: {},
        evolutions: [],
      })
      cacheService.set('full_pikachu', mockPokemon)
      const fetchSpy = vi.spyOn(globalThis, 'fetch')

      const result = await getFullPokemonData('pikachu')
      expect(result).toBeInstanceOf(Pokemon)
      expect(result.id).toBe(25)
      expect(fetchSpy).not.toHaveBeenCalled()
    })
  })
})
