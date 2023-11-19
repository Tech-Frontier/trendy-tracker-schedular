import { STORAGE, RecruitInfo } from '@trendy-tracker-schedular/storage';

interface Options {
  id: string;
  prevRecruitList: RecruitInfo[];
  hash: string;
  persistentRecruitUrl: string;
}

export async function modifyUpdatedRecruit({ hash, id, persistentRecruitUrl, prevRecruitList } : Options) {
  const prevHash = prevRecruitList.find(x => x.url === persistentRecruitUrl)!.hash;

  if (prevHash !== hash) {
    await STORAGE.addRecruit({
      id,
      url: persistentRecruitUrl,
      hash: hash,
      status: 'active'
    });

    // TODO: 수정 API
    await new Promise(r => setTimeout(r, 2000));
  }

  return { prevHash, currentHash: hash };
}
