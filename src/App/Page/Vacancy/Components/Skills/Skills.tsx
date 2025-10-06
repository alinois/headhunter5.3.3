import { useState } from "react";
import { Card, Text, Pill, PillsInput, Button, Group } from "@mantine/core";
import Plus from "../../../../../assets/Plus.png";
import './Skills.scss'

interface SkillsProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const Skills = ({ skills, setSkills }: SkillsProps) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const skill = text.trim();
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setText("");
    }
  };

  const handleRemove = (skillToRemove: string) => {
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };
  

  return (
    <Group className="skills-border">
      <Card className="skills" radius="md">
        <Text fw={600}>Ключевые навыки</Text>

        <Group className="skills-add">
          <PillsInput className="skills-add-input" size="xs" radius="md">
            <PillsInput.Field
              placeholder="Навык"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </PillsInput>
          <Button
            data-testid="addSkill-button"
            className="skills-add-button"
            variant="filled"
            radius="md"
            size="lg"
            color="#228BE6"
            onClick={handleAdd}
          >
            <img src={Plus} />
          </Button>
        </Group>

        <Pill.Group>
          {skills.map((skill) => (
            <Pill key={skill} withRemoveButton onRemove={() => handleRemove(skill)}>
              {skill}
            </Pill>
          ))}
        </Pill.Group>
      </Card>
    </Group>
  );
};

export default Skills;
