import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { PokemonDetailModal } from '../../components/pokemon/PokemonDetailModal/PokemonDetailModal'
import { createPokemon } from '../factories/pokemonFactory'

describe('PokemonDetailModal component', () => {
  describe('rendering', () => {
    it('renders the pokemon name', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByRole('heading', { level: 2, name: 'Charmander' })).toBeInTheDocument()
    })

    it('renders the formatted id', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByText('#004')).toBeInTheDocument()
    })

    it('renders the genus', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByText('Lizard Pokémon')).toBeInTheDocument()
    })

    it('renders the formatted height', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByText('0.6 M')).toBeInTheDocument()
    })

    it('renders the formatted weight', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByText('8.5 KG')).toBeInTheDocument()
    })

    it('renders all abilities', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByText('Blaze')).toBeInTheDocument()
      expect(screen.getByText('Solar Power')).toBeInTheDocument()
    })

    it('renders the hero artwork image', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(
        screen.getByAltText('Arte oficial de Charmander, da espécie Lizard Pokémon')
      ).toBeInTheDocument()
    })

    it('does NOT render genus when it is empty', () => {
      const pokemon = createPokemon({ genus: '' })
      render(<PokemonDetailModal pokemon={pokemon} onClose={vi.fn()} />)
      expect(screen.queryByText('Lizard Pokémon')).not.toBeInTheDocument()
    })

    it('renders close button with aria-label "Fechar detalhes de Charmander"', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Fechar detalhes de Charmander' })).toBeInTheDocument()
    })

    it('renders the evolutions section', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByText('Evolutions')).toBeInTheDocument()
    })

    it('has role="dialog" for accessibility', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('has aria-modal="true"', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    })
  })

  describe('navigation buttons', () => {
    it('renders the Previous button when onPrevious is provided', () => {
      render(
        <PokemonDetailModal
          pokemon={createPokemon()}
          onClose={vi.fn()}
          onPrevious={vi.fn()}
        />
      )
      expect(screen.getByRole('button', { name: 'Pokémon anterior' })).toBeInTheDocument()
    })

    it('does NOT render the Previous button when onPrevious is undefined', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.queryByRole('button', { name: 'Pokémon anterior' })).not.toBeInTheDocument()
    })

    it('renders the Next button when onNext is provided', () => {
      render(
        <PokemonDetailModal
          pokemon={createPokemon()}
          onClose={vi.fn()}
          onNext={vi.fn()}
        />
      )
      expect(screen.getByRole('button', { name: 'Próximo Pokémon' })).toBeInTheDocument()
    })

    it('does NOT render the Next button when onNext is undefined', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(screen.queryByRole('button', { name: 'Próximo Pokémon' })).not.toBeInTheDocument()
    })

    it('calls onNext when Next button is clicked', async () => {
      const user = userEvent.setup()
      const onNext = vi.fn()
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} onNext={onNext} />)
      await user.click(screen.getByRole('button', { name: 'Próximo Pokémon' }))
      expect(onNext).toHaveBeenCalledTimes(1)
    })

    it('calls onPrevious when Previous button is clicked', async () => {
      const user = userEvent.setup()
      const onPrevious = vi.fn()
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} onPrevious={onPrevious} />)
      await user.click(screen.getByRole('button', { name: 'Pokémon anterior' }))
      expect(onPrevious).toHaveBeenCalledTimes(1)
    })
  })

  describe('keyboard navigation', () => {
    it('calls onClose when Escape key is pressed', () => {
      const onClose = vi.fn()
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={onClose} />)
      fireEvent.keyDown(window, { key: 'Escape' })
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when ArrowRight key is pressed', () => {
      const onNext = vi.fn()
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} onNext={onNext} />)
      fireEvent.keyDown(window, { key: 'ArrowRight' })
      expect(onNext).toHaveBeenCalledTimes(1)
    })

    it('calls onPrevious when ArrowLeft key is pressed', () => {
      const onPrevious = vi.fn()
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} onPrevious={onPrevious} />)
      fireEvent.keyDown(window, { key: 'ArrowLeft' })
      expect(onPrevious).toHaveBeenCalledTimes(1)
    })

    it('does NOT call onNext on ArrowRight if onNext is not provided', () => {
      // Should not throw
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      expect(() => fireEvent.keyDown(window, { key: 'ArrowRight' })).not.toThrow()
    })
  })

  describe('backdrop click', () => {
    it('calls onClose when backdrop is clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={onClose} />)
      // The backdrop is the dialog element itself (outermost div with role="dialog")
      await user.click(screen.getByRole('dialog'))
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('panel background color', () => {
    it('applies pokemon colorName as backgroundColor on the panel', () => {
      render(<PokemonDetailModal pokemon={createPokemon()} onClose={vi.fn()} />)
      // The panel has inline style with backgroundColor
      const panel = screen.getByRole('dialog').querySelector('[style*="background-color"]')
      expect(panel).not.toBeNull()
    })
  })
})
