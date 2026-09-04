import { useEffect } from 'react'
import { formatPokemonId, formatHeight, formatWeight, capitalize } from '../../../utils/formatters'
import { IconButton } from '../../common/IconButton/IconButton'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../../common/Icons/Icons'
import { EvolutionList } from '../EvolutionList/EvolutionList'
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
        <IconButton 
          className={styles.closeBtn} 
          onClick={onClose}
          ariaLabel="Close"
        >
          <CloseIcon size={28} />
        </IconButton>

        {onPrevious && (
          <IconButton
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={onPrevious}
            ariaLabel="Previous Pokemon"
          >
            <ChevronLeftIcon size={36} />
          </IconButton>
        )}

        {onNext && (
          <IconButton
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={onNext}
            ariaLabel="Next Pokemon"
          >
            <ChevronRightIcon size={36} />
          </IconButton>
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

          <EvolutionList
            evolutions={pokemon.evolutions}
            currentPokemonId={pokemon.id}
            onSelectPokemon={onSelectPokemon}
          />
        </div>
      </div>
    </div>
  )
}
