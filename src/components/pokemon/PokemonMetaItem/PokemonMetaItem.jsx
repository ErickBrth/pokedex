import styles from './PokemonMetaItem.module.scss'

/**
 * Atomic component for displaying a labeled metadata value.
 * Used in PokemonDetailModal for HEIGHT, WEIGHT, ABILITIES, etc.
 */
export function PokemonMetaItem({ label, children }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <div className={styles.metaValue}>{children}</div>
    </div>
  )
}
