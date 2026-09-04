import { useEffect } from 'react'
import { formatPokemonId, formatHeight, formatWeight, capitalize } from '../../../utils/formatters'
import styles from './PokemonDetailModal.module.scss'

export function PokemonDetailModal({ 
  pokemon, 
  onClose, 
  onNext, 
  onPrevious,
  onSelectPokemon 
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrevious) onPrevious()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrevious])

  return (
    <div 
      className={styles.backdrop} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="1.5" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {onPrevious && (
          <button
            type="button"
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={onPrevious}
            aria-label="Previous Pokemon"
          >
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="1.5" fill="none">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {onNext && (
          <button
            type="button"
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={onNext}
            aria-label="Next Pokemon"
          >
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="1.5" fill="none">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        <div 
          className={styles.panel}
          style={{
            backgroundColor: pokemon.colorName,
            '--panel-color': pokemon.colorName
          }}
        >
          <div className={styles.topSection}>
            <div className={styles.content}>
              <span className={styles.number}>{formatPokemonId(pokemon.id)}</span>
              <h2 className={styles.name}>{capitalize(pokemon.name)}</h2>
              {pokemon.genus && (
                <p className={styles.genus}>{pokemon.genus}</p>
              )}

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>HEIGHT</span>
                   <span className={styles.metaValue}>{formatHeight(pokemon.height)}</span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>WEIGHT</span>
                   <span className={styles.metaValue}>{formatWeight(pokemon.weight)}</span>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>ABILITIES</span>
                  <div className={styles.abilities}>
                    {pokemon.abilities.map((ability, idx) => (
                      <span key={`${ability}-${idx}`} className={styles.abilityText}>
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.imageCol}>
              <img
                src={pokemon.sprites.artwork || pokemon.sprites.frontDefault}
                alt={pokemon.name}
                className={styles.pokemonHero}
              />
            </div>
          </div>

          {pokemon.evolutions && pokemon.evolutions.length > 0 && (
            <div className={styles.evolutionsSection}>
              <h3 className={styles.evolutionsTitle}>Evolutions</h3>
              <div className={styles.evolutionsList}>
                {pokemon.evolutions.map((evo) => {
                  const isCurrent = evo.id === pokemon.id
                  return (
                    <button
                      key={evo.id}
                      type="button"
                      className={`${styles.evoCard} ${isCurrent ? styles.activeEvo : ''}`}
                      onClick={() => {
                        if (!isCurrent && onSelectPokemon) {
                          onSelectPokemon(evo.name)
                        }
                      }}
                    >
                      <img
                        src={evo.sprite}
                        alt={evo.name}
                        className={styles.evoImage}
                      />
                      <span className={styles.evoName}>{capitalize(evo.name)}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
