import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const defaultValues = {
  page: 0,
  text: "",
  skills: ["TypeScript", "JavaScript", "React"],
  city: "Все города",
};

export const useVacancySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page")) || defaultValues.page);
  const [text, setText] = useState(searchParams.get("text") || defaultValues.text);
  const [skills, setSkills] = useState(
    searchParams.get("skills")?.split(",") || defaultValues.skills
  );
  const [city, setCity] = useState(defaultValues.city);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (page !== defaultValues.page) params.page = page.toString();
    if (text !== defaultValues.text) params.text = text;
    if (skills.join(",") !== defaultValues.skills.join(",")) params.skills = skills.join(",");

    setSearchParams(params, { replace: true });
  }, [page, text, skills, setSearchParams]);

  return {
    page, setPage,
    text, setText,
    skills, setSkills,
    city, setCity,
  };
};
