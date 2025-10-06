import { NavLink, useParams } from 'react-router-dom';
import './Cities.scss';
import { Tabs } from '@mantine/core'; 

export const Cities = () => {
  const { city: cityParam } = useParams();

  const activeValue =
    cityParam === 'petersburg'
      ? 'petersburg'
      : cityParam === 'moscow'
      ? 'moscow'
      : 'all';

  return (
    <Tabs className="city-tabs" color="indigo" value={activeValue}>
      <Tabs.List>
        <Tabs.Tab value="moscow" className="city-tabs-choise">
          <NavLink to="/vacancy/moscow">Москва</NavLink>
        </Tabs.Tab>
        <Tabs.Tab value="petersburg" className="city-tabs-choise">
          <NavLink to="/vacancy/petersburg">Санкт-Петербург</NavLink>
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};
