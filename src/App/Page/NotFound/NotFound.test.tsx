import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound component', () => {
  it('renders title and description', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </MantineProvider>
    );
    expect(screen.getByText(/Упс! Такой страницы не существует/i)).toBeInTheDocument();
    expect(screen.getByText(/Давайте перейдём к началу./i)).toBeInTheDocument();
  });

  it('renders button with correct link', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </MantineProvider>
    );
    const buttonLink = screen.getByRole('link', { name: /На главную/i });
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute('href', '/');
  });

  it('renders cat image', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </MantineProvider>
    );
    const img = screen.getByRole('img');
    expect(img).toHaveClass('sad-cat');
    expect(img).toHaveAttribute('src', expect.stringContaining('sad-cat.gif'));
  });
});
