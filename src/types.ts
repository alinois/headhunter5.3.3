export interface Skill {
  name: string;
}

export interface VacancyType {
  id: string;
  name: string;

  salary?: {
    from?: number;
    to?: number;
    currency?: string;
    gross?: boolean;
  };

  experience?: {
    id: string;
    name: string;
  };

  employer?: {
    id: string;
    name: string;
    logo_urls?: {
      [key: string]: string;
    };
    alternate_url?: string;
  };

  schedule?: {
    id: string;
    name: string;
  };

  area?: {
    id: string;
    name: string;
  };

  keySkills?: Skill[];

  alternate_url: string;

  description?: string;
}
