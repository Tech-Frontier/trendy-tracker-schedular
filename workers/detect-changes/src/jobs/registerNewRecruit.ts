import { STORAGE } from '@trendy-tracker-schedular/storage';
import { TTAPI } from '@trendy-tracker-schedular/ttapi';
import { PUPPETEER } from '../puppeteer/index';

interface Options {
  addedRecruitUrl: string;
  id: string;
  hashSelector: string;
  company: string;
  jobCategory: string;
}

export async function registerNewRecruit({ addedRecruitUrl, company, hashSelector, id, jobCategory }: Options) {
  await STORAGE.addRecruit({
    id,
    url: addedRecruitUrl,
    hash: await PUPPETEER.getRecruitHash(addedRecruitUrl, hashSelector),
    status: 'active'
  });

  // TODO: 등록 API
  const msg = await TTAPI.registerRecruit({
    company,
    jobCategory,
    url: addedRecruitUrl,
  });

  await new Promise(r => setTimeout(r, 2000));

  return {
    msg
  };
}
