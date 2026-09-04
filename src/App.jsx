import { useState, useEffect } from 'react'
import { Header } from './components/layout/Header/Header'
import { PokemonCard } from './components/pokemon/PokemonCard/PokemonCard'
import { SkeletonCard } from './components/pokemon/SkeletonCard/SkeletonCard'
import { PokemonDetailModal } from './components/pokemon/PokemonDetailModal/PokemonDetailModal'
import { getFullPokemonData } from './services/pokeApi'
import styles from './App.module.scss'

const FEATURED_CATEGORIES = [
  'bulbasaur',
  'charmander',
  'squirtle',
  'caterpie',
  'pidgey',
  'rattata',
  'ekans',
  'pikachu'
]

export function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [activeModalPokemon, setActiveModalPokemon] = useState(null)

  useEffect(() => {
    let isCancelled = false

    async function loadPokemons() {
      try {
        const list = await Promise.all(
          FEATURED_CATEGORIES.map(id => getFullPokemonData(id))
        )

        if (!isCancelled) {
          setPokemons(list)
          const defaultSelected = list.find(p => p.name === 'charmander') || list[0]
          setSelectedPokemon(defaultSelected)
        }
      } catch (err) {
        console.error('Failed to fetch pokemon list:', err)
      } finally {
        if (!isCancelled) setLoading(false)
      }
    }

    loadPokemons()

    return () => {
      isCancelled = true
    }
  }, [])

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon)
    setActiveModalPokemon(pokemon)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.gridContainer} aria-label="Pokemons">
          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: FEATURED_CATEGORIES.length }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isSelected={selectedPokemon?.id === pokemon.id}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {activeModalPokemon && (
        <PokemonDetailModal
          pokemon={activeModalPokemon}
          onClose={() => setActiveModalPokemon(null)}
          onNext={() => {
            const currentIndex = pokemons.findIndex(p => p.id === activeModalPokemon.id)
            if (currentIndex !== -1 && currentIndex < pokemons.length - 1) {
              const nextPokemon = pokemons[currentIndex + 1]
              setSelectedPokemon(nextPokemon)
              setActiveModalPokemon(nextPokemon)
            }
          }}
          onPrevious={() => {
            const currentIndex = pokemons.findIndex(p => p.id === activeModalPokemon.id)
            if (currentIndex > 0) {
              const prevPokemon = pokemons[currentIndex - 1]
              setSelectedPokemon(prevPokemon)
              setActiveModalPokemon(prevPokemon)
            }
          }}
          onSelectPokemon={async (name) => {
            const data = await getFullPokemonData(name)
            setSelectedPokemon(data)
            setActiveModalPokemon(data)
          }}
        />
      )}
    </div>
  )
}

export default App
