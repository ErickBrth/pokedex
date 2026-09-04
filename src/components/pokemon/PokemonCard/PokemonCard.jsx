import { capitalize } from '../../../utils/formatters'
import styles from './PokemonCard.module.scss'

export function PokemonCard({ pokemon, isSelected = false, onClick }) {
  return (
    <article 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      style={isSelected && pokemon.colorName ? { borderColor: pokemon.colorName } : undefined}
      onClick={() => onClick(pokemon)}
      tabIndex={0}
      role="button"
      aria-label={pokemon.name}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(pokemon)
        }
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={pokemon.sprites.animated || pokemon.sprites.frontDefault || pokemon.sprites.artwork}
          alt={pokemon.name}
          className={styles.pokemonImage}
          loading="lazy"
        />
      </div>

      {isSelected && (
        <span 
          className={styles.nameLabel}
          style={pokemon.colorName ? { color: pokemon.colorName } : undefined}
        >
          {capitalize(pokemon.name)}
        </span>
      )}
    </article>
  )
}
