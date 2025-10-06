import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { MantineProvider } from '@mantine/core';

describe('Header component', () => {
  it('renders logo and title', () => {
    render(
    <MantineProvider>
        <MemoryRouter>
            <Header />
        </MemoryRouter>
      </MantineProvider>
    );

    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();

    expect(screen.getByText('.FrontEnd')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Вакансии FE')).toBeInTheDocument();
    expect(screen.getByText('Обо мне')).toBeInTheDocument();
  });
});
