import { PUPPETEER } from '../puppeteer/index';
import { STORAGE } from '../storage/index';
import { TTAPI } from '../ttapi/index';

interface Options {
  addedRecruitUrl: string;
  id: string;
  hashSelector: string;
  company: string;
  occupation: string;
}

export async function registerNewRecruit({ addedRecruitUrl, company, hashSelector, id, occupation }: Options) {
  await STORAGE.addRecruit({
    id,
    url: addedRecruitUrl,
    hash: await PUPPETEER.getRecruitHash(addedRecruitUrl, hashSelector),
    status: 'active'
  });

  // TODO: 등록 API
  const msg = await TTAPI.registerRecruit({
    company,
    occupation,
    url: addedRecruitUrl,
  });

  await new Promise(r => setTimeout(r, 2000));

  return {
    msg
  };
}
