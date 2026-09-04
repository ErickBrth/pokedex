import styles from './PokemonSpriteImage.module.scss'

/**
 * Atomic component for rendering a Pokemon sprite/image.
 * Centralizes image rendering logic (alt text, lazy loading, etc.)
 */
export function PokemonSpriteImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  pixelated = false,
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${styles.sprite} ${pixelated ? styles.pixelated : ''} ${className}`}
      loading={loading}
      draggable={false}
    />
  )
}
