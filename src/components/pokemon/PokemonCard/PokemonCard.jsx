import { PokemonSpriteImage } from '../PokemonSpriteImage/PokemonSpriteImage'
import styles from './PokemonCard.module.scss'

export function PokemonCard({ pokemon, isSelected = false, onClick }) {
  return (
    <article 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      style={isSelected && pokemon.colorName ? { borderColor: pokemon.colorName } : undefined}
      onClick={() => onClick(pokemon)}
      tabIndex={0}
      role="button"
      aria-label={pokemon.displayName}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(pokemon)
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <PokemonSpriteImage
          src={pokemon.defaultSprite}
          alt={pokemon.displayName}
          className={styles.pokemonImage}
          pixelated
        />
      </div>

      {isSelected && (
        <span 
          className={styles.nameLabel}
          style={pokemon.colorName ? { color: pokemon.colorName } : undefined}
        >
          {pokemon.displayName}
        </span>
      )}
    </article>
  )
}
