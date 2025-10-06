import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import OpenVacancy from './OpenVacancy';
import * as vacancyApi from '../../../api/vacancy-fetch';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

describe('OpenVacancy component', () => {
  const mockedUseGetVacancyQuery = vi.spyOn(vacancyApi, 'useGetVacancyQuery');

  it('renders loading state', () => {
    mockedUseGetVacancyQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MantineProvider>
        <MemoryRouter>
          <OpenVacancy />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText(/Проверяем данные.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUseGetVacancyQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MantineProvider>
        <MemoryRouter>
          <OpenVacancy />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText(/Ошибка при загрузке вакансии/i)).toBeInTheDocument();
  });

  it('renders vacancy correctly', () => {
    const fakeVacancy = {
      id: '123',
      name: 'Frontend Developer',
      salary: { from: 100000, to: 150000, currency: 'RUB' },
      experience: { name: '1–3 года' },
      employer: { name: 'Test Company' },
      schedule: 'remote',
      area: { name: 'Москва' },
      alternate_url: 'https://hh.ru/vacancy/123',
      description: '<p>Задачи: разработка SPA</p>',
    };

    mockedUseGetVacancyQuery.mockReturnValue({
      data: fakeVacancy,
      isLoading: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <MantineProvider>
        <MemoryRouter>
          <OpenVacancy />
        </MemoryRouter>
      </MantineProvider>
    );

    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
    expect(screen.getByText(/1–3 года/i)).toBeInTheDocument();
    expect(screen.getByText(/Москва/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Откликнуться/i })).toHaveAttribute(
      'href',
      'https://hh.ru/vacancy/123'
    );
    expect(screen.getByText(/разработка SPA/i)).toBeInTheDocument();
  });
});
