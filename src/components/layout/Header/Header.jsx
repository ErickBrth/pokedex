import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.brandHeader}>
      <div className={styles.logoCircle}>
        <img 
          src="/orbital-logo.svg" 
          alt="Orbital Logo" 
          className={styles.logoSvg}
        />
      </div>
      <h1 className={styles.companyName}>Orbital</h1>
      <p className={styles.challengeSubtitle}>Frontend Challenge</p>
    </header>
  )
}
