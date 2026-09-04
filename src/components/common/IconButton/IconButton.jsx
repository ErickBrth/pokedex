import styles from './IconButton.module.scss'

export function IconButton({ 
  onClick, 
  ariaLabel, 
  children, 
  className = '', 
  type = 'button' 
}) {
  return (
    <button
      type={type}
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
