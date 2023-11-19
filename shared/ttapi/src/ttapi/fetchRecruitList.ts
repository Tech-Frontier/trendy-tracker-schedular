import dotenv from 'dotenv';
dotenv.config();

import { ttapi } from './client';

export interface Recruit {
  id: number,
  company: string;
  jobCategory: string;
  url: string;
  title: string;
  createdTime: string;
  techList: string[];
}

export async function fetchRecruitListByCompany({ company }: { company: string }): Promise<Recruit[]> {
  try {
    const { data } = await ttapi.get(`/api/recruit/list?company=${company}&pageNo=1&pageSize=500`);

    return data.data.recruitList;
  } catch (error: any) {
    if (error.message === 'Request failed with status code 404') {
      return [];
    }

    throw error;
  }
}
