import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { VacancyType } from '../types';

interface VacanciesResponse {
  items: VacancyType[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

interface FetchVacanciesParams {
  page?: number;
  text?: string;
  skills?: string[];
  city?: string;
}

const CITY_TO_AREA: Record<string, string> = {
  Москва: '1',
  'Санкт-Петербург': '2',
};

export const vacanciesApi = createApi({
  reducerPath: 'vacanciesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.hh.ru/',
    prepareHeaders: (headers) => {
      headers.set('User-Agent', 'my-app');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVacancies: builder.query<VacanciesResponse, FetchVacanciesParams>({
      query: ({ page = 0, text = '', skills = ['TypeScript','JavaScript','React'], city } = {}) => {
        const params = new URLSearchParams({
          industry: '7',
          professional_role: '96',
          page: page.toString(),
          per_page: '10',
        });

        if (text || skills.length) {
          const skillsQuery = skills.map(s => `"${s}"`).join(' AND ');
          params.set('text', [text, skillsQuery].filter(Boolean).join(' AND '));
        }

        if (city && city !== 'Все города') {
          const areaId = CITY_TO_AREA[city];
          if (areaId) params.set('area', areaId);
        }

        return `vacancies?${params.toString()}`;
      },
    }),

    getVacancy: builder.query<VacancyType, string>({
      query: (id) => `vacancies/${id}`,
    }),
  }),
});

export const { useGetVacanciesQuery, useGetVacancyQuery } = vacanciesApi;
