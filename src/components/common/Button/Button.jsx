import { forwardRef } from 'react'
import styles from './Button.module.scss'

export const Button = forwardRef(function Button({
  variant = 'icon',
  onClick,
  ariaLabel,
  className = '',
  type = 'button',
  disabled = false,
  children,
}, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
})
