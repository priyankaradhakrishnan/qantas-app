import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ListCountry from './ListCountry';

jest.mock('axios');

describe('ListCountry component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          name: { common: 'Argentina' },
          cca2: 'AR',
          ccn3: '032',
          timezones: ['UTC-03:00'],
          flags: { svg: 'https://restcountries.com/data/arg.svg' },
        },
        {
          name: { common: 'Brazil' },
          cca2: 'BR',
          ccn3: '076',
          timezones: ['UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00'],
          flags: { svg: 'https://restcountries.com/data/bra.svg' },
        },
      ],
    });
  });

  it('renders the country list', async () => {
    render(<ListCountry />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('filters the country list by search term', async () => {
    render(<ListCountry />);

    const searchInput = screen.getByLabelText('Search Country');
    fireEvent.change(searchInput, { target: { value: 'b' } });

    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Brazil');
  });

  it('paginates the country list', async () => {
    render(<ListCountry />);

    const nextButton = screen.getByRole('button', { name: 'Go to next page' });
    expect(nextButton).toBeEnabled();
    const prevButton = screen.getByRole('button', { name: 'Go to previous page' });
    expect(prevButton).toBeDisabled();

    fireEvent.click(nextButton);
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems).toHaveLength(0);
    expect(prevButton).toBeEnabled();

    fireEvent.click(prevButton);
    const updatedListItems = await screen.findAllByRole('listitem');
    expect(updatedListItems).toHaveLength(2);
    expect(nextButton).toBeEnabled();
  });
});
