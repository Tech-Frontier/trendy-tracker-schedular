import { ttapi } from './client';

interface Options {
  url: string;
  company: string;
  occupation: string;
}

export async function registerRecruit({ company, occupation, url }: Options) {
  const { data } = await ttapi.post(`/api/recruit/regist`, {
    url,
    company,
    occupation,
  });

  return data.msg;
}
