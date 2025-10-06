import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Vacancy from './Vacancy';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import type { VacancyType } from '../../../types';

const mockVacancies: VacancyType[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  name: `Vacancy ${i}`,
  salary: { from: 1000, to: 2000, currency: 'RUB' },
  experience: { id: '1', name: '1+ year' },
  employer: { id: '1', name: 'Company' },
  schedule: { id: 'fullDay', name: 'fullDay' },
  area: { id: 'Москва', name: 'Москва' },
  alternate_url: 'https://example.com',
}));

vi.mock('../../../api/vacancy-fetch', async () => {
  const actual = await vi.importActual('../../../api/vacancy-fetch');
  return {
    ...actual,
    useGetVacanciesQuery: vi.fn(() => ({
      data: { items: mockVacancies },
      isLoading: false,
      error: null,
    })),
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MantineProvider >
      <MemoryRouter>{ui}</MemoryRouter>
    </MantineProvider>
  );
};

describe('Vacancy component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders 10 Titles and updates filters', () => {
    renderWithProviders(<Vacancy />);

    const titles = screen.getAllByText(/Vacancy/);
    expect(titles).toHaveLength(10);

    const searchInput = screen.getByPlaceholderText(
      'Должность или название компании'
    );
    fireEvent.change(searchInput, { target: { value: 'React' } });
    expect(searchInput).toHaveValue('React');
  });
});
