import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import CountryDetails from './CountryDetails';

jest.mock('axios');

describe('CountryDetails', () => {
  const mockData = {
    name: {
      common: 'Canada',
    },
    flags: {
      svg: 'https://restcountries.com/data/can.svg',
    },
    cca2: 'CA',
    ccn3: '124',
    timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30'],
  };

  it('should render country details correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: [mockData] });

    render(
      <MemoryRouter initialEntries={['/countries/Canada']}>
        <CountryDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Country Details')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
      expect(screen.getByText('ISO Code: CA')).toBeInTheDocument();
      expect(screen.getByText('Calling Code: 124')).toBeInTheDocument();
      expect(screen.getByText('Timezones: UTC-08:00, UTC-07:00, UTC-06:00, UTC-05:00, UTC-04:00, UTC-03:30')).toBeInTheDocument();
    });
  });

  it('should handle error when fetching data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching data'));

    render(
      <MemoryRouter initialEntries={['/countries/Canada']}>
        <CountryDetails />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Error fetching data')).toBeInTheDocument();
    });
  });

  it('should go back to the list page when back button is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: [mockData] });

    render(
      <MemoryRouter initialEntries={['/countries/Canada']}>
        <CountryDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Country Details')).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: 'Back' });
    userEvent.click(backButton);

    expect(screen.getByText('Country List')).toBeInTheDocument();
  });
});
