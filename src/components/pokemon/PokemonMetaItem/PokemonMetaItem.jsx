import styles from './PokemonMetaItem.module.scss'

export function PokemonMetaItem({ label, children }) {
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaLabel}>{label}</span>
      <div className={styles.metaValue}>{children}</div>
    </div>
  )
}
