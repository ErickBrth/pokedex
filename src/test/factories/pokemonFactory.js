import { Pokemon } from '../../models/Pokemon'

export const REAL_SPRITE_URLS = {
  charmander: {
    artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    animated: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/4.gif',
    frontDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  charmeleon: {
    artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
    frontDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  },
  charizard: {
    artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    frontDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  pikachu: {
    artwork: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    animated: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
    frontDefault: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
}

/**
 * Creates default raw Pokemon data for testing, using authentic PokeAPI URLs.
 *
 * @param {Partial<import('../../models/Pokemon').Pokemon>} overrides
 * @returns {object}
 */
export function createPokemonData(overrides = {}) {
  return {
    id: 4,
    name: 'charmander',
    genus: 'Lizard Pokémon',
    height: 6,
    weight: 85,
    abilities: ['Blaze', 'Solar Power'],
    sprites: {
      artwork: REAL_SPRITE_URLS.charmander.artwork,
      animated: REAL_SPRITE_URLS.charmander.animated,
      frontDefault: REAL_SPRITE_URLS.charmander.frontDefault,
    },
    colorName: 'red',
    evolutions: createEvolutionList(),
    ...overrides,
  }
}

/**
 * Creates an instance of Pokemon model with default authentic PokeAPI values and overrides.
 *
 * @param {Partial<import('../../models/Pokemon').Pokemon>} overrides
 * @returns {Pokemon}
 */
export function createPokemon(overrides = {}) {
  return new Pokemon(createPokemonData(overrides))
}

/**
 * Creates a mock list of evolutions with authentic PokeAPI sprite URLs.
 *
 * @param {Array<object>} [customList]
 * @returns {Array<{ id: number, name: string, sprite: string }>}
 */
export function createEvolutionList(customList) {
  if (customList) return customList

  return [
    {
      id: 4,
      name: 'charmander',
      sprite: REAL_SPRITE_URLS.charmander.frontDefault,
    },
    {
      id: 5,
      name: 'charmeleon',
      sprite: REAL_SPRITE_URLS.charmeleon.frontDefault,
    },
    {
      id: 6,
      name: 'charizard',
      sprite: REAL_SPRITE_URLS.charizard.frontDefault,
    },
  ]
}

/**
 * Creates raw PokeAPI details payload mirroring the real PokeAPI JSON structure.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createRawPokeApiDetails(overrides = {}) {
  return {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    abilities: [
      { ability: { name: 'static' } },
      { ability: { name: 'lightning-rod' } },
    ],
    sprites: {
      front_default: REAL_SPRITE_URLS.pikachu.frontDefault,
      other: {
        'official-artwork': {
          front_default: REAL_SPRITE_URLS.pikachu.artwork,
        },
        showdown: {
          front_default: REAL_SPRITE_URLS.pikachu.animated,
        },
      },
    },
    ...overrides,
  }
}

/**
 * Creates raw PokeAPI species payload mirroring the real PokeAPI JSON structure.
 *
 * @param {object} overrides
 * @returns {object}
 */
export function createRawPokeApiSpecies(overrides = {}) {
  return {
    color: { name: 'yellow' },
    genera: [{ language: { name: 'en' }, genus: 'Mouse Pokémon' }],
    evolution_chain: null,
    ...overrides,
  }
}
