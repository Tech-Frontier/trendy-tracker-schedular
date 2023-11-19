import { STORAGE } from '@trendy-tracker-schedular/storage';
import { TTAPI } from '@trendy-tracker-schedular/ttapi';

interface Options {
  addedRecruitUrl: string;
  id: string;
  hash: string;
  company: string;
  jobCategory: string;
}

export async function registerNewRecruit({ addedRecruitUrl, company, hash, id, jobCategory }: Options) {
  await STORAGE.addRecruit({
    id,
    url: addedRecruitUrl,
    hash,
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
