import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

export function CloseIcon({ size = 28 }) {
  return (
    <CloseRoundedIcon 
      sx={{ fontSize: size }} 
      aria-hidden="true" 
    />
  )
}

export function ChevronLeftIcon({ size = 36 }) {
  return (
    <ChevronLeftRoundedIcon 
      sx={{ fontSize: size }} 
      aria-hidden="true" 
    />
  )
}

export function ChevronRightIcon({ size = 36 }) {
  return (
    <ChevronRightRoundedIcon 
      sx={{ fontSize: size }} 
      aria-hidden="true" 
    />
  )
}
