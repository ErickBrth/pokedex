export function formatPokemonId(id) {
  if (!id && id !== 0) return '#000'
  return `#${String(id).padStart(3, '0')}`
}

export function formatWeight(hectograms) {
  if (hectograms == null) return '--'
  return `${(hectograms / 10)} KG`
}

export function formatHeight(decimeters) {
  if (decimeters == null) return '--'
  return `${(decimeters / 10).toFixed(1)} M`
}

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
