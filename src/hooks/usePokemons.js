import { useState, useEffect, useCallback } from 'react'
import { getFullPokemonData } from '../services/pokeApi'

export const FEATURED_CATEGORIES = [
  'bulbasaur',
  'charmander',
  'squirtle',
  'caterpie',
  'pidgey',
  'rattata',
  'ekans',
  'pikachu'
]

export function usePokemons() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [activeModalPokemon, setActiveModalPokemon] = useState(null)

  const loadPokemons = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await Promise.all(
        FEATURED_CATEGORIES.map(id => getFullPokemonData(id))
      )
      setPokemons(list)
      const defaultSelected = list.find(p => p.name === 'charmander') || list[0]
      setSelectedPokemon(defaultSelected)
    } catch (err) {
      console.error('Failed to fetch pokemon list:', err)
      setError('Não foi possível carregar a lista de Pokémon. Verifique sua conexão e tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPokemons()
  }, [loadPokemons])

  const handleCardClick = useCallback((pokemon) => {
    setSelectedPokemon(pokemon)
    setActiveModalPokemon(pokemon)
  }, [])

  const handleNavigateSpecies = useCallback((direction) => {
    if (!activeModalPokemon) return
    const currentIndex = pokemons.findIndex(p => p.belongsToFamily(activeModalPokemon))
    if (currentIndex === -1) return

    const nextIndex = currentIndex + direction
    if (nextIndex >= 0 && nextIndex < pokemons.length) {
      const targetPokemon = pokemons[nextIndex]
      setSelectedPokemon(targetPokemon)
      setActiveModalPokemon(targetPokemon)
    }
  }, [activeModalPokemon, pokemons])

  const handleNextSpecies = useCallback(() => handleNavigateSpecies(1), [handleNavigateSpecies])
  const handlePreviousSpecies = useCallback(() => handleNavigateSpecies(-1), [handleNavigateSpecies])

  const handleSelectEvolution = useCallback(async (name) => {
    try {
      const data = await getFullPokemonData(name)
      setSelectedPokemon(data)
      setActiveModalPokemon(data)
    } catch (err) {
      console.error('Failed to load evolution data:', err)
    }
  }, [])

  const closeModal = useCallback(() => {
    setActiveModalPokemon(null)
  }, [])

  return {
    pokemons,
    loading,
    error,
    selectedPokemon,
    activeModalPokemon,
    retry: loadPokemons,
    handleCardClick,
    handleNextSpecies,
    handlePreviousSpecies,
    handleSelectEvolution,
    closeModal
  }
}
