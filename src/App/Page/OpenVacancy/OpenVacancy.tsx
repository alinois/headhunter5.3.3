import { useParams } from 'react-router-dom';
import { useGetVacanciesQuery } from '../../../api/vacancy-fetch';
import { Text, Badge, Group, Button, Card } from '@mantine/core';
import { formatSalary, formatSchedule, getScheduleClass } from '../Vacancy/Components/Titles/Titles-logic';
import classNames from 'classnames';
import './OpenVacancy.scss'

const OpenVacancy = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetVacanciesQuery({});

  if (isLoading) return <div>Проверяем данные...</div>;
  if (error) return <div>Ошибка при загрузке вакансии</div>;

  const vacancy = data?.items.find(v => v.id === id);

  if (!vacancy) return <div>Такой вакансии не существует</div>;

  return (
    <Group className='card-n-descr'>
        <Card className="vacancy-card" radius="md">
                <Group className="title-head">
                    <Text className="title-head-name" fw={600} c="#364FC7">{vacancy.name}</Text>
                    <Group className="title-head-decr">
                        <Text className="title-head-decr-pay" fw={400} size="sm" c="black">
                            {formatSalary(vacancy.salary)}
                        </Text>
                        <Text className="title-head-decr-exp" fw={400} size="sm" c="dimmed">{vacancy.experience?.name ?? "Опыт не указан"}</Text>
                    </Group>
                </Group>
    
                <Group className="title-info">
                    <Text className="title-info-company" fw={400} size="sm" c="dimmed">{vacancy.employer?.name ?? "Компания не указана"}</Text>
                    <Badge className={classNames("title-info-format", getScheduleClass(vacancy.schedule))} color="indigo" radius="xs" size="xs">
                        {formatSchedule(vacancy.schedule)}
                    </Badge>
                    <Text className="title-info-location" size="sm" c="black">{vacancy.area?.name ?? "Регион не указан"}</Text>
                </Group>
    
                <Group className="title-buttons">
    
                    <Button className="title-buttons-reply"
                            component="a"
                            href={vacancy.alternate_url}
                            target="_blank"
                            rel="noopener noreferrer">
                        Откликнуться на hh.ru
                    </Button>
                </Group>
        </Card>

        <Card className="descr-card" radius="md">
            
        </Card>
    </Group>
  );
};

export default OpenVacancy;
