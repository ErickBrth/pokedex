import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.brandHeader}>
      <img 
        src="/orbital-logo.svg" 
        alt="Logotipo da Orbital" 
        className={styles.logo}
        width={72}
        height={72}
      />
      <h1 className={styles.companyName}>Orbital</h1>
      <p className={styles.challengeSubtitle}>Frontend Challenge</p>
    </header>
  )
}
