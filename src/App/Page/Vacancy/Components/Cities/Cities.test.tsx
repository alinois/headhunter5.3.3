import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Cities } from './Cities';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

describe('Cities', () => {
  const renderCity = (route: string) =>
    render(
      <MantineProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/vacancy/:city" element={<Cities />} />
          <Route path="/vacancy" element={<Cities />} />
        </Routes>
      </MemoryRouter>
      </MantineProvider>
    );

  test('renders tabs and sets active', () => {
    renderCity('/vacancy/moscow');

    const moscowTab = screen.getByText('Москва').closest('button');
    const petersburgTab = screen.getByText('Санкт-Петербург').closest('button');

    expect(moscowTab).toHaveAttribute('data-active', 'true');
    expect(petersburgTab).not.toHaveAttribute('data-active');
  });

  test('unknown city sets no active tab', () => {
    renderCity('/vacancy/minsk');

    const moscowTab = screen.getByText('Москва').closest('button');
    const petersburgTab = screen.getByText('Санкт-Петербург').closest('button');

    expect(moscowTab).not.toHaveAttribute('data-active');
    expect(petersburgTab).not.toHaveAttribute('data-active');
  });
});
