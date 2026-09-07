import { forwardRef } from 'react'
import { Button } from '../Button/Button'

export const IconButton = forwardRef(function IconButton({ 
  onClick, 
  ariaLabel, 
  children, 
  className = '', 
  type = 'button' 
}, ref) {
  return (
    <Button
      ref={ref}
      variant="icon"
      type={type}
      onClick={onClick}
      ariaLabel={ariaLabel}
      className={className}
    >
      {children}
    </Button>
  )
})
