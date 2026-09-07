import { PokemonSpriteImage } from '../PokemonSpriteImage/PokemonSpriteImage'
import styles from './PokemonCard.module.scss'

export function PokemonCard({ pokemon, isSelected = false, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      style={isSelected && pokemon.colorName ? { borderColor: pokemon.colorName } : undefined}
      onClick={() => onClick(pokemon)}
      aria-label={`Ver detalhes de ${pokemon.displayName}`}
      aria-pressed={isSelected}
    >
      <div className={styles.imageWrapper}>
        <PokemonSpriteImage
          src={pokemon.defaultSprite}
          alt={`${pokemon.displayName} — sprite de identificação`}
          className={styles.pokemonImage}
          pixelated
        />
      </div>

      {isSelected && (
        <span 
          className={styles.nameLabel}
          style={pokemon.colorName ? { color: pokemon.colorName } : undefined}
          aria-hidden="true"
        >
          {pokemon.displayName}
        </span>
      )}
    </button>
  )
}
