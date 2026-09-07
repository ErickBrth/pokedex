import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { EvolutionList } from '../../components/pokemon/EvolutionList/EvolutionList'
import { createEvolutionList } from '../factories/pokemonFactory'

describe('EvolutionList component', () => {
  const evolutions = createEvolutionList()

  it('renders the "Evolutions" title', () => {
    render(<EvolutionList evolutions={evolutions} currentPokemonId={4} onSelectPokemon={vi.fn()} />)
    expect(screen.getByText('Evolutions')).toBeInTheDocument()
  })

  it('renders a card for each evolution', () => {
    render(<EvolutionList evolutions={evolutions} currentPokemonId={4} onSelectPokemon={vi.fn()} />)
    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('Charmeleon')).toBeInTheDocument()
    expect(screen.getByText('Charizard')).toBeInTheDocument()
  })

  it('renders evolution sprites with correct alt text', () => {
    render(<EvolutionList evolutions={evolutions} currentPokemonId={4} onSelectPokemon={vi.fn()} />)
    expect(screen.getByAltText('Charmander — estágio atual da evolução')).toBeInTheDocument()
    expect(screen.getByAltText('Charmeleon — próxima etapa da cadeia evolutiva')).toBeInTheDocument()
    expect(screen.getByAltText('Charizard — próxima etapa da cadeia evolutiva')).toBeInTheDocument()
  })

  it('does not render when evolutions is empty', () => {
    const { container } = render(
      <EvolutionList evolutions={[]} currentPokemonId={4} onSelectPokemon={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('does not render when evolutions is null', () => {
    const { container } = render(
      <EvolutionList evolutions={null} currentPokemonId={4} onSelectPokemon={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('calls onSelectPokemon when a non-current evolution is clicked', async () => {
    const user = userEvent.setup()
    const onSelectPokemon = vi.fn()
    render(<EvolutionList evolutions={evolutions} currentPokemonId={4} onSelectPokemon={onSelectPokemon} />)

    await user.click(screen.getByRole('button', { name: 'Ver evolução Charmeleon' }))
    expect(onSelectPokemon).toHaveBeenCalledWith('charmeleon')
    expect(onSelectPokemon).toHaveBeenCalledTimes(1)
  })

  it('does NOT call onSelectPokemon when the current pokemon card is clicked', async () => {
    const user = userEvent.setup()
    const onSelectPokemon = vi.fn()
    render(<EvolutionList evolutions={evolutions} currentPokemonId={4} onSelectPokemon={onSelectPokemon} />)

    await user.click(screen.getByRole('button', { name: 'Evolução atual: Charmander' }))
    expect(onSelectPokemon).not.toHaveBeenCalled()
  })

  it('renders aria-labels on all evolution buttons', () => {
    render(<EvolutionList evolutions={evolutions} currentPokemonId={4} onSelectPokemon={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Evolução atual: Charmander' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver evolução Charmeleon' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver evolução Charizard' })).toBeInTheDocument()
  })
})
