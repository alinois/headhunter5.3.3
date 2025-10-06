import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Titles from './Titles';
import type { VacancyType } from '../../../../../types';
import type * as RR from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

const mockVacancy: VacancyType = {
  id: '1',
  name: 'Test Vacancy',
  salary: { from: 1000, to: 2000, currency: 'RUB' },
  experience: { id: '1', name: '1+ year' },
  employer: { id: '1', name: 'Company' },
  schedule: { id: 'fullDay', name: 'fullDay' },
  area: { id: 'Москва', name: 'Москва' },
  alternate_url: 'https://example.com',
};

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual: typeof RR = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Titles component', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders vacancy data and buttons work', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <Titles vacancy={mockVacancy} />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText('Test Vacancy')).toBeInTheDocument();
    expect(screen.getByText('1000 - 2000 RUB')).toBeInTheDocument();
    expect(screen.getByText('1+ year')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();

    const viewButton = screen.getByText('Смотреть вакансии');
    fireEvent.click(viewButton);
    expect(navigateMock).toHaveBeenCalledWith('/vacancy/id/1', { state: { vacancy: mockVacancy } });

    const replyButton = screen.getByRole('link', { name: /Откликнуться/i });
    expect(replyButton).toHaveAttribute('href', 'https://example.com');
  });
});
