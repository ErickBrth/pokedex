import { Button } from '../Button/Button'

export function IconButton({ onClick, ariaLabel, children, className = '', type = 'button' }) {
  return (
    <Button
      variant="icon"
      type={type}
      onClick={onClick}
      ariaLabel={ariaLabel}
      className={className}
    >
      {children}
    </Button>
  )
}
