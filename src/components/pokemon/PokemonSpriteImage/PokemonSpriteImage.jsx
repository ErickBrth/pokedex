import styles from './PokemonSpriteImage.module.scss'

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
