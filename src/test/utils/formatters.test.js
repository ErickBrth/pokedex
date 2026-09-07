import { describe, it, expect } from 'vitest'
import { capitalize, formatHeight, formatWeight, formatPokemonId } from '../../utils/formatters'

describe('formatters', () => {
  describe('capitalize', () => {
    it('capitalizes the first letter', () => {
      expect(capitalize('pikachu')).toBe('Pikachu')
    })

    it('handles already capitalized strings', () => {
      expect(capitalize('Bulbasaur')).toBe('Bulbasaur')
    })

    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('')
    })

    it('returns empty string for null/undefined', () => {
      expect(capitalize(null)).toBe('')
      expect(capitalize(undefined)).toBe('')
    })

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A')
    })
  })

  describe('formatPokemonId', () => {
    it('pads single digit IDs with leading zeros', () => {
      expect(formatPokemonId(1)).toBe('#001')
    })

    it('pads two digit IDs', () => {
      expect(formatPokemonId(25)).toBe('#025')
    })

    it('does not pad three digit IDs', () => {
      expect(formatPokemonId(150)).toBe('#150')
    })

    it('handles 0', () => {
      expect(formatPokemonId(0)).toBe('#000')
    })

    it('returns #000 for null', () => {
      expect(formatPokemonId(null)).toBe('#000')
    })

    it('returns #000 for undefined', () => {
      expect(formatPokemonId(undefined)).toBe('#000')
    })
  })

  describe('formatHeight', () => {
    it('converts decimeters to meters with one decimal', () => {
      expect(formatHeight(6)).toBe('0.6 M')
    })

    it('handles two digit decimeters', () => {
      expect(formatHeight(17)).toBe('1.7 M')
    })

    it('returns "--" for null', () => {
      expect(formatHeight(null)).toBe('--')
    })

    it('returns "--" for undefined', () => {
      expect(formatHeight(undefined)).toBe('--')
    })

    it('handles 0', () => {
      expect(formatHeight(0)).toBe('0.0 M')
    })
  })

  describe('formatWeight', () => {
    it('converts hectograms to kilograms', () => {
      expect(formatWeight(85)).toBe('8.5 KG')
    })

    it('returns "--" for null', () => {
      expect(formatWeight(null)).toBe('--')
    })

    it('returns "--" for undefined', () => {
      expect(formatWeight(undefined)).toBe('--')
    })

    it('handles 0', () => {
      expect(formatWeight(0)).toBe('0 KG')
    })
  })
})
