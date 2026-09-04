import { capitalize } from '../../../utils/formatters'
import { Button } from '../../common/Button/Button'
import { PokemonSpriteImage } from '../PokemonSpriteImage/PokemonSpriteImage'
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
            <Button
              key={evo.id}
              variant="card"
              className={`${styles.evoCard} ${isCurrent ? styles.activeEvo : ''}`}
              onClick={() => {
                if (!isCurrent && onSelectPokemon) {
                  onSelectPokemon(evo.name)
                }
              }}
              ariaLabel={`Select evolution ${evo.name}`}
            >
              <PokemonSpriteImage
                src={evo.sprite}
                alt={evo.name}
                className={styles.evoImage}
                pixelated
              />
              <span className={styles.evoName}>{capitalize(evo.name)}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
