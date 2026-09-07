import { useEffect, useRef } from 'react'
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
  const closeBtnRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    // Focus close button when modal opens for keyboard navigation
    closeBtnRef.current?.focus?.()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext()
      } else if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious()
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrevious])

  const heroAltDescription = pokemon.genus
    ? `Arte oficial de ${pokemon.displayName}, da espécie ${pokemon.genus}`
    : `Arte oficial de ${pokemon.displayName}`

  return (
    <div 
      className={styles.backdrop} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-detail-name"
      ref={modalRef}
    >
      <div 
        className={styles.modalWrapper} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.headerRow}>
          <IconButton 
            ref={closeBtnRef}
            className={styles.closeBtn} 
            onClick={onClose}
            ariaLabel={`Fechar detalhes de ${pokemon.displayName}`}
          >
            <CloseIcon size={28} />
          </IconButton>
        </div>

        {onPrevious && (
          <IconButton
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={onPrevious}
            ariaLabel="Pokémon anterior"
          >
            <ChevronLeftIcon size={36} />
          </IconButton>
        )}

        {onNext && (
          <IconButton
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={onNext}
            ariaLabel="Próximo Pokémon"
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
              <span className={styles.number} aria-label={`Número de registro ${pokemon.formattedId}`}>
                {pokemon.formattedId}
              </span>
              <h2 id="pokemon-detail-name" className={styles.name}>
                {pokemon.displayName}
              </h2>
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
                alt={heroAltDescription}
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
