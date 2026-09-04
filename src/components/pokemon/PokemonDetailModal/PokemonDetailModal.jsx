import { useEffect } from 'react'
import { IconButton } from '../../common/IconButton/IconButton'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../../common/Icons/Icons'
import { EvolutionList } from '../EvolutionList/EvolutionList'
import { PokemonMetaItem } from '../PokemonMetaItem/PokemonMetaItem'
import { PokemonSpriteImage } from '../PokemonSpriteImage/PokemonSpriteImage'
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
        <div className={styles.headerRow}>
          <IconButton 
            className={styles.closeBtn} 
            onClick={onClose}
            ariaLabel="Close"
          >
            <CloseIcon size={28} />
          </IconButton>
        </div>

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
              <span className={styles.number}>{pokemon.formattedId}</span>
              <h2 className={styles.name}>{pokemon.displayName}</h2>
              {pokemon.genus && (
                <p className={styles.genus}>{pokemon.genus}</p>
              )}

              <div className={styles.metaGrid}>
                <PokemonMetaItem label="HEIGHT">
                  {pokemon.formattedHeight}
                </PokemonMetaItem>

                <PokemonMetaItem label="WEIGHT">
                  {pokemon.formattedWeight}
                </PokemonMetaItem>

                <PokemonMetaItem label="ABILITIES">
                  {pokemon.abilities.map((ability, idx) => (
                    <span key={`${ability}-${idx}`}>{ability}</span>
                  ))}
                </PokemonMetaItem>
              </div>
            </div>

            <div className={styles.imageCol}>
              <PokemonSpriteImage
                src={pokemon.heroArtwork}
                alt={pokemon.displayName}
                className={styles.pokemonHero}
                loading="eager"
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
