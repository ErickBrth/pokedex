import { Header } from './components/layout/Header/Header'
import { PokemonCard } from './components/pokemon/PokemonCard/PokemonCard'
import { SkeletonCard } from './components/pokemon/SkeletonCard/SkeletonCard'
import { PokemonDetailModal } from './components/pokemon/PokemonDetailModal/PokemonDetailModal'
import { usePokemons, FEATURED_CATEGORIES } from './hooks/usePokemons'
import styles from './App.module.scss'

export function App() {
  const {
    pokemons,
    loading,
    error,
    selectedPokemon,
    activeModalPokemon,
    retry,
    handleCardClick,
    handleNextSpecies,
    handlePreviousSpecies,
    handleSelectEvolution,
    closeModal
  } = usePokemons()

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.gridContainer} aria-label="Pokémons em Destaque">
          {loading ? (
            <div className={styles.grid} aria-busy="true" aria-label="Carregando pokémons">
              {Array.from({ length: FEATURED_CATEGORIES.length }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className={styles.errorContainer} role="alert">
              <p className={styles.errorMessage}>{error}</p>
              <button type="button" onClick={retry} className={styles.retryBtn}>
                Tentar novamente
              </button>
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
          onClose={closeModal}
          onNext={handleNextSpecies}
          onPrevious={handlePreviousSpecies}
          onSelectPokemon={handleSelectEvolution}
        />
      )}
    </div>
  )
}

export default App
