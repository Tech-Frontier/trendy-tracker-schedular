import { ttapi } from './client';

interface Options {
  url: string;
  company: string;
  jobCategory: string;
}

export async function registerRecruit({ company, jobCategory, url }: Options) {
  try {

    const { data } = await ttapi.post(`/api/recruit/regist`, {
      url,
      company,
      jobCategory,
    });

    return data.msg;
  } catch (error: any) {
    if (error?.response?.data?.message === 'already exist') {
      return '이미 존재합니다.';
    }

    throw error;
  }
}
