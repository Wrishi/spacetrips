import { render, screen, cleanup } from '@testing-library/react'
import List from '../List'



test('To render item component', () => {
    render(<List/>)
    const itemElement = screen.getByTestId("list-1")
    expect(itemElement).toBeInTheDocument()
})