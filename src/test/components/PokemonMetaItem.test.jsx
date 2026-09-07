import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PokemonMetaItem } from '../../components/pokemon/PokemonMetaItem/PokemonMetaItem'

describe('PokemonMetaItem component', () => {
  it('renders the label', () => {
    render(<PokemonMetaItem label="HEIGHT">0.6 M</PokemonMetaItem>)
    expect(screen.getByText('HEIGHT')).toBeInTheDocument()
  })

  it('renders the children value', () => {
    render(<PokemonMetaItem label="WEIGHT">8.5 KG</PokemonMetaItem>)
    expect(screen.getByText('8.5 KG')).toBeInTheDocument()
  })

  it('renders multiple children (abilities list)', () => {
    render(
      <PokemonMetaItem label="ABILITIES">
        <span>Blaze</span>
        <span>Solar Power</span>
      </PokemonMetaItem>
    )
    expect(screen.getByText('Blaze')).toBeInTheDocument()
    expect(screen.getByText('Solar Power')).toBeInTheDocument()
  })

  it('renders both label and value simultaneously', () => {
    render(<PokemonMetaItem label="HEIGHT">0.6 M</PokemonMetaItem>)
    expect(screen.getByText('HEIGHT')).toBeInTheDocument()
    expect(screen.getByText('0.6 M')).toBeInTheDocument()
  })
})
