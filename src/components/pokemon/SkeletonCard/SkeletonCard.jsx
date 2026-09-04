import styles from './SkeletonCard.module.scss'

export function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.placeholder}></div>
    </div>
  )
}
