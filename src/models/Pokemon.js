import { capitalize } from '../utils/formatters'

/**
 * Domain model class representing a Pokemon.
 */
export class Pokemon {
  constructor({
    id,
    name,
    genus = '',
    height = 0,
    weight = 0,
    abilities = [],
    sprites = {},
    colorName = 'blue',
    evolutions = []
  }) {
    this.id = Number(id) || 0
    this.name = String(name || '').toLowerCase()
    this.genus = String(genus || '')
    this.height = Number(height) || 0
    this.weight = Number(weight) || 0
    this.abilities = Array.isArray(abilities) ? abilities : []
    this.sprites = sprites || {}
    this.colorName = String(colorName || 'blue').toLowerCase()
    this.evolutions = Array.isArray(evolutions) ? evolutions : []

    // Ensure immutability for domain integrity
    Object.freeze(this)
  }

  get formattedId() {
    return `#${String(this.id).padStart(3, '0')}`
  }

  get displayName() {
    if (!this.name) return ''
    return this.name.charAt(0).toUpperCase() + this.name.slice(1)
  }

  get formattedHeight() {
    return `${(this.height / 10).toFixed(1)} M`
  }

  get formattedWeight() {
    return `${this.weight / 10} KG`
  }

  get defaultSprite() {
    return (
      this.sprites.animated ||
      this.sprites.frontDefault ||
      this.sprites.artwork ||
      ''
    )
  }

  get heroArtwork() {
    return this.sprites.artwork || this.sprites.frontDefault || ''
  }

  belongsToFamily(target) {
    if (!target) return false
    const targetId = typeof target === 'object' ? target.id : Number(target)
    const targetName = (typeof target === 'object' ? target.name : String(target)).toLowerCase()

    if (this.id === targetId || this.name === targetName) {
      return true
    }

    const inCurrentEvolutions = this.evolutions.some(
      evo => evo.id === targetId || evo.name.toLowerCase() === targetName
    )
    if (inCurrentEvolutions) return true

    if (typeof target === 'object' && Array.isArray(target.evolutions)) {
      return target.evolutions.some(
        evo => evo.id === this.id || evo.name.toLowerCase() === this.name
      )
    }

    return false
  }

  /**
   * Factory method to build a validated Pokemon instance from raw PokeAPI responses.
   */
  static fromApiResponse(details, species, evolutions = []) {
    const genus = species?.genera?.find(g => g.language.name === 'en')?.genus || ''
    const colorName = species?.color?.name || 'blue'

    return new Pokemon({
      id: details.id,
      name: details.name,
      genus,
      height: details.height,
      weight: details.weight,
      abilities: (details.abilities || []).map(a => capitalize(a.ability.name.replace('-', ' '))),
      sprites: {
        artwork: details.sprites?.other?.['official-artwork']?.front_default || details.sprites?.front_default || '',
        animated: details.sprites?.other?.showdown?.front_default || details.sprites?.front_default || '',
        frontDefault: details.sprites?.front_default || ''
      },
      colorName,
      evolutions
    })
  }
}
