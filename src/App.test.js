import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';

test('renders learn react link', async() => {
  render(<App />);
  const logo = screen.getByText(/SPACE TRIPS/i);
  expect(logo).toBeInTheDocument();

  await act(async () => {
    const text = screen.getByText(/Departure time/i);
    expect(text).toBeInTheDocument();
  });

  // await act(async () => {render(<SearchBar/>)})
});
