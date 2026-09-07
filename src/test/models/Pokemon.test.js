import { describe, it, expect } from 'vitest'
import { Pokemon } from '../../models/Pokemon'
import {
  createPokemon,
  createRawPokeApiDetails,
  createRawPokeApiSpecies,
  REAL_SPRITE_URLS,
} from '../factories/pokemonFactory'

describe('Pokemon model', () => {
  describe('constructor', () => {
    it('creates a Pokemon with correct properties', () => {
      const p = createPokemon()
      expect(p.id).toBe(4)
      expect(p.name).toBe('charmander')
      expect(p.colorName).toBe('red')
    })

    it('coerces id to Number', () => {
      const p = createPokemon({ id: '25' })
      expect(p.id).toBe(25)
    })

    it('lowercases name', () => {
      const p = createPokemon({ name: 'PIKACHU' })
      expect(p.name).toBe('pikachu')
    })

    it('defaults evolutions to empty array if not provided', () => {
      const p = createPokemon({ evolutions: undefined })
      expect(p.evolutions).toEqual([])
    })

    it('defaults abilities to empty array if not an array', () => {
      const p = createPokemon({ abilities: null })
      expect(p.abilities).toEqual([])
    })

    it('defaults colorName to "blue" if missing', () => {
      const p = createPokemon({ colorName: undefined })
      expect(p.colorName).toBe('blue')
    })

    it('freezes the object (immutability)', () => {
      const p = createPokemon()
      expect(Object.isFrozen(p)).toBe(true)
    })
  })

  describe('computed getters', () => {
    const p = createPokemon()

    it('formattedId pads id to 3 digits with #', () => {
      expect(p.formattedId).toBe('#004')
    })

    it('displayName capitalizes the name', () => {
      expect(p.displayName).toBe('Charmander')
    })

    it('formattedHeight converts decimeters to meters', () => {
      expect(p.formattedHeight).toBe('0.6 M')
    })

    it('formattedWeight converts hectograms to kilograms', () => {
      expect(p.formattedWeight).toBe('8.5 KG')
    })

    it('heroArtwork prefers artwork sprite', () => {
      expect(p.heroArtwork).toBe(REAL_SPRITE_URLS.charmander.artwork)
    })

    it('heroArtwork falls back to frontDefault when artwork is missing', () => {
      const p2 = createPokemon({
        sprites: { artwork: '', frontDefault: REAL_SPRITE_URLS.charmander.frontDefault },
      })
      expect(p2.heroArtwork).toBe(REAL_SPRITE_URLS.charmander.frontDefault)
    })

    it('defaultSprite prefers animated', () => {
      expect(p.defaultSprite).toBe(REAL_SPRITE_URLS.charmander.animated)
    })

    it('defaultSprite falls back to frontDefault when animated missing', () => {
      const p2 = createPokemon({
        sprites: { animated: '', frontDefault: REAL_SPRITE_URLS.charmander.frontDefault, artwork: '' },
      })
      expect(p2.defaultSprite).toBe(REAL_SPRITE_URLS.charmander.frontDefault)
    })
  })

  describe('belongsToFamily', () => {
    const charmander = createPokemon()

    it('returns true when target IS the pokemon (same id)', () => {
      expect(charmander.belongsToFamily({ id: 4, name: 'charmander' })).toBe(true)
    })

    it('returns true when target IS the pokemon (same name)', () => {
      expect(charmander.belongsToFamily({ id: 999, name: 'charmander' })).toBe(true)
    })

    it('returns true when target is a direct evolution (by id)', () => {
      expect(charmander.belongsToFamily({ id: 5, name: 'charmeleon' })).toBe(true)
    })

    it('returns true when target is a direct evolution (by name)', () => {
      expect(charmander.belongsToFamily({ id: 999, name: 'charmeleon' })).toBe(true)
    })

    it('returns false for an unrelated pokemon', () => {
      expect(charmander.belongsToFamily({ id: 1, name: 'bulbasaur', evolutions: [] })).toBe(false)
    })

    it('returns false for null', () => {
      expect(charmander.belongsToFamily(null)).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(charmander.belongsToFamily(undefined)).toBe(false)
    })

    it('returns true when this pokemon appears in target.evolutions', () => {
      const charmeleon = createPokemon({
        id: 5,
        name: 'charmeleon',
        evolutions: [
          { id: 4, name: 'charmander' },
          { id: 5, name: 'charmeleon' },
          { id: 6, name: 'charizard' },
        ],
      })
      expect(charmander.belongsToFamily(charmeleon)).toBe(true)
    })
  })

  describe('static fromApiResponse', () => {
    it('builds a Pokemon from raw API response', () => {
      const details = createRawPokeApiDetails()
      const species = createRawPokeApiSpecies()

      const p = Pokemon.fromApiResponse(details, species, [])
      expect(p.id).toBe(25)
      expect(p.name).toBe('pikachu')
      expect(p.colorName).toBe('yellow')
      expect(p.genus).toBe('Mouse Pokémon')
      expect(p.abilities).toContain('Static')
      expect(p.abilities).toContain('Lightning rod')
      expect(p.sprites.artwork).toBe(REAL_SPRITE_URLS.pikachu.artwork)
      expect(p.sprites.animated).toBe(REAL_SPRITE_URLS.pikachu.animated)
    })

    it('falls back to blue color when species has no color', () => {
      const details = createRawPokeApiDetails({ id: 1, name: 'test' })
      const p = Pokemon.fromApiResponse(details, null, [])
      expect(p.colorName).toBe('blue')
    })

    it('falls back to empty string genus when species has no English genus', () => {
      const details = createRawPokeApiDetails({ id: 1, name: 'test' })
      const species = createRawPokeApiSpecies({
        color: { name: 'green' },
        genera: [{ language: { name: 'ja' }, genus: 'なんとかポケモン' }],
      })
      const p = Pokemon.fromApiResponse(details, species, [])
      expect(p.genus).toBe('')
    })
  })
})
