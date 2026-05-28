import { render, screen } from '@testing-library/react'
import App from '../../src/App'

describe('App', () => {
  it('renders the site title as an h1 heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'FIFA World Cup 2026' })).toBeInTheDocument()
  })
})
