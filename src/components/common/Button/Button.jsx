import styles from './Button.module.scss'

/**
 * Unified Button component.
 *
 * Variants:
 *  - "icon"  → transparent icon-only button (close, nav arrows)
 *  - "card"  → pressable card-shaped button (evolution cards)
 */
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
