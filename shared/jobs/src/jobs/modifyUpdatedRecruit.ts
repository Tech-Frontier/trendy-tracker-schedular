import { PUPPETEER } from '@trendy-tracker-schedular/puppeteer';
import { STORAGE, RecruitInfo } from '@trendy-tracker-schedular/storage';

interface Options {
  id: string;
  prevRecruitList: RecruitInfo[];
  hashSelector: string;
  persistentRecruitUrl: string;
}

export async function modifyUpdatedRecruit({ hashSelector, id, persistentRecruitUrl, prevRecruitList } : Options) {
  const prevHash = prevRecruitList.find(x => x.url === persistentRecruitUrl)!.hash;
  const currentHash = await PUPPETEER.getRecruitHash(persistentRecruitUrl, hashSelector);

  if (prevHash !== currentHash) {
    await STORAGE.addRecruit({
      id,
      url: persistentRecruitUrl,
      hash: currentHash,
      status: 'active'
    });

    // TODO: 수정 API
    await new Promise(r => setTimeout(r, 2000));
  }

  return { prevHash, currentHash };
}
