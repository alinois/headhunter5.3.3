import { Group, Pagination } from '@mantine/core';
import ListSearch from './Components/ListSearch/ListSearch';
import Skills from './Components/Skills/Skills';
import Titles from './Components/Titles/Titles';
import { Cities } from './Components/Cities/Cities';
import { useGetVacanciesQuery } from '../../../api/vacancy-fetch';
import { useVacancySearchParams } from '../../../hooks/useVacancySearchParams';
import './Vacancy.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import NotFound from '../NotFound/NotFound'

const Vacancy = () => {
  const {
    page, setPage,
    text: searchQuery, setText: setSearchQuery,
    skills, setSkills,
    city, setCity,
  } = useVacancySearchParams();

  const { city: cityParam } = useParams();

  useEffect(() => {
    if (cityParam === 'moscow') setCity('Москва');
    else if (cityParam === 'petersburg') setCity('Санкт-Петербург');
    else setCity('Все города');
  }, [cityParam, setCity]);

  const { data, error, isLoading } = useGetVacanciesQuery({
    page,
    text: searchQuery,
    skills,
    city,
  });

  const validCities = ['moscow', 'petersburg'];

  if (cityParam && !validCities.includes(cityParam)) {
    return <NotFound />;
  }


  return (
    <Group className="vacancy">
      <ListSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
      
      <Group className="search-params">
        <Skills skills={skills} setSkills={setSkills} />
        
      </Group>

      <Group className="all-titles">
        <Cities />
        {isLoading && <div className="vacancy-status">Подыскиваем вакансии...</div>}
        {error && <div className="vacancy-status">Ошибка при загрузке вакансий</div>}
        {data?.items.map(v => (
          <Titles key={v.id} vacancy={v} />
        ))}

        <Pagination
          total={data?.pages ?? 0}
          value={page + 1}
          onChange={(p) => setPage(p - 1)}
          color="indigo"
          withEdges
        />
      </Group>
    </Group>
  );
};

export default Vacancy;
