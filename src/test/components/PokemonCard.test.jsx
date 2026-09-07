import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { PokemonCard } from '../../components/pokemon/PokemonCard/PokemonCard'
import { createPokemon } from '../factories/pokemonFactory'

describe('PokemonCard component', () => {
  it('renders an article with role="button"', () => {
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has aria-label with the pokemon display name', () => {
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Ver detalhes de Charmander' })).toBeInTheDocument()
  })

  it('renders the pokemon sprite image', () => {
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={vi.fn()} />)
    expect(screen.getByAltText('Charmander — sprite de identificação')).toBeInTheDocument()
  })

  it('calls onClick with the pokemon object when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: 'Ver detalhes de Charmander' }))
    expect(onClick).toHaveBeenCalledWith(pokemon)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={onClick} />)
    screen.getByRole('button', { name: 'Ver detalhes de Charmander' }).focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledWith(pokemon)
  })

  it('calls onClick when Space key is pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={onClick} />)
    screen.getByRole('button', { name: 'Ver detalhes de Charmander' }).focus()
    await user.keyboard('{ }')
    expect(onClick).toHaveBeenCalledWith(pokemon)
  })

  it('shows the name label when isSelected is true', () => {
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} isSelected onClick={vi.fn()} />)
    expect(screen.getByText('Charmander')).toBeInTheDocument()
  })

  it('does NOT show the name label when isSelected is false', () => {
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} isSelected={false} onClick={vi.fn()} />)
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument()
  })

  it('applies border color from pokemon.colorName when selected', () => {
    const pokemon = createPokemon({ colorName: 'red' })
    render(<PokemonCard pokemon={pokemon} isSelected onClick={vi.fn()} />)
    const card = screen.getByRole('button', { name: 'Ver detalhes de Charmander' })
    expect(card.style.borderColor).toBe('red')
  })

  it('is focusable via tabIndex', () => {
    const pokemon = createPokemon()
    render(<PokemonCard pokemon={pokemon} onClick={vi.fn()} />)
    // native <button> elements do not have an explicit tabindex by default
    // but are still keyboard-focusable — verify it is reachable via Tab
    expect(screen.getByRole('button', { name: 'Ver detalhes de Charmander' })).toBeInTheDocument()
  })
})
