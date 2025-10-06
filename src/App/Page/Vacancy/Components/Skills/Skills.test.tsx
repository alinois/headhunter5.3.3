import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "./Skills";
import { MantineProvider } from '@mantine/core';
import { vi } from "vitest";

test("find base skills", () => {
  const skills = ["React", "JavaScript", "TypeScript"];
  const setSkills = vi.fn();

  render(
    <MantineProvider>
      <Skills skills={skills} setSkills={setSkills} />
    </MantineProvider>
  );

  const reactSkill = screen.getByText('React');
  const jsSkill = screen.getByText('JavaScript');
  const stSkill = screen.getByText('TypeScript');

   expect(reactSkill).toBeInTheDocument();
   expect(jsSkill).toBeInTheDocument();
   expect(stSkill).toBeInTheDocument();
})

test("input working right", async () => { 
  const skills = ["React", "JavaScript", "TypeScript"];
  const setSkills = vi.fn();
  
  render(
    <MantineProvider>
      <Skills skills={skills} setSkills={setSkills} />
    </MantineProvider>
  );
  
  const input = screen.getByPlaceholderText(/Навык/i);
  const button = screen.getByTestId("addSkill-button");
  const user = userEvent.setup();

  await user.type(input, "Redux");
  await user.click(button);

  expect(setSkills).toHaveBeenCalledTimes(1);

  const callback = setSkills.mock.calls[0][0];
  expect(callback(skills)).toEqual([...skills, "Redux"]);
});

