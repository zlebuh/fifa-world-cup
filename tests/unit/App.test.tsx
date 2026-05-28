import { render, screen } from '@testing-library/react'
import App from '../../src/App'

describe('App', () => {
  it('renders the site title in the header', () => {
    render(<App />)
    expect(screen.getByText('FIFA World Cup 2026')).toBeInTheDocument()
  })
})
