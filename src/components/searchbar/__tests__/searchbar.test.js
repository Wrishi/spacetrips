import { render, screen, cleanup } from '@testing-library/react'
import SearchBar from '../SearchBar'


test('To render list', () => {
    render(<SearchBar/>)
    const searchbar = screen.getByTestId("search-bar")
    expect(searchbar).toBeInTheDocument()
    // expect(true).toBe(true)
})