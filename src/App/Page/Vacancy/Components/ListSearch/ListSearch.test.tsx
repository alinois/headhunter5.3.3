import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListSearch from "./ListSearch";
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';

test("find area from select city", async () => {
  const setSearchQuery = vi.fn();
  const setPage = vi.fn();      
  const searchQuery = "";         

  render(
    <MantineProvider>
      <ListSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
    </MantineProvider>
  );

  const input = screen.getByPlaceholderText(/Должность или название компании/i);
  expect(input).toBeInTheDocument();

  const user = userEvent.setup();
  await user.type(input, 'middle');
  expect(input).toHaveValue('middle');
});
