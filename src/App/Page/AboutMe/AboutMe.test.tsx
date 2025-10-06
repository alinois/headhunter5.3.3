import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import AboutMe from './AboutMe';

describe('AboutMe component', () => {
  it('renders name', () => {
    render(
      <MantineProvider>
        <AboutMe />
      </MantineProvider>
    );
    expect(screen.getByText(/Алина Корытько/i)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <MantineProvider>
        <AboutMe />
      </MantineProvider>
    );
    expect(screen.getByText(/Frontend-разработчик/i)).toBeInTheDocument();
    expect(screen.getByText(/не умею делать сальто/i)).toBeInTheDocument();
  });
});
