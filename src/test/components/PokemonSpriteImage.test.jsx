import { describe, it, expect} from 'vitest'
import { render, screen } from '@testing-library/react'
import { PokemonSpriteImage } from '../../components/pokemon/PokemonSpriteImage/PokemonSpriteImage'

describe('PokemonSpriteImage component', () => {
  it('renders an img element', () => {
    render(<PokemonSpriteImage src="https://example.com/pikachu.png" alt="Pikachu" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('sets the correct src', () => {
    render(<PokemonSpriteImage src="https://example.com/pikachu.png" alt="Pikachu" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/pikachu.png')
  })

  it('sets the correct alt text', () => {
    render(<PokemonSpriteImage src="https://example.com/pikachu.png" alt="Pikachu" />)
    expect(screen.getByAltText('Pikachu')).toBeInTheDocument()
  })

  it('sets loading="lazy" by default', () => {
    render(<PokemonSpriteImage src="https://example.com/test.png" alt="Test Pokemon" />)
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
  })

  it('overrides loading attribute', () => {
    render(<PokemonSpriteImage src="https://example.com/test.png" alt="Test Pokemon" loading="eager" />)
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')
  })

  it('sets draggable="false"', () => {
    render(<PokemonSpriteImage src="https://example.com/test.png" alt="Test Pokemon" />)
    expect(screen.getByRole('img')).toHaveAttribute('draggable', 'false')
  })

  it('applies extra className', () => {
    render(<PokemonSpriteImage src="https://example.com/test.png" alt="Test Pokemon" className="hero-image" />)
    expect(screen.getByRole('img')).toHaveClass('hero-image')
  })
})
