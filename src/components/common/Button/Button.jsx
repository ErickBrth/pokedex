import styles from './Button.module.scss'

export function Button({
  variant = 'icon',
  onClick,
  ariaLabel,
  className = '',
  type = 'button',
  disabled = false,
  children,
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
