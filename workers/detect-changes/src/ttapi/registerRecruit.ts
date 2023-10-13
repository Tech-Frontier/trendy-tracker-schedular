import { ttapi } from './client';

interface Options {
  url: string;
  company: string;
  jobCategory: string;
}

export async function registerRecruit({ company, jobCategory, url }: Options) {
  const { data } = await ttapi.post(`/api/recruit/regist`, {
    url,
    company,
    jobCategory,
  });

  return data.msg;
}
