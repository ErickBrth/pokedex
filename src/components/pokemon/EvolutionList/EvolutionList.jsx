import { capitalize } from '../../../utils/formatters'
import styles from './EvolutionList.module.scss'

export function EvolutionList({ 
  evolutions, 
  currentPokemonId, 
  onSelectPokemon 
}) {
  if (!evolutions || evolutions.length === 0) return null

  return (
    <div className={styles.evolutionsSection}>
      <h3 className={styles.evolutionsTitle}>Evolutions</h3>
      <div className={styles.evolutionsList}>
        {evolutions.map((evo) => {
          const isCurrent = evo.id === currentPokemonId
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
              aria-label={`Select evolution ${evo.name}`}
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
  )
}
