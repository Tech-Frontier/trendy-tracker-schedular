import { STORAGE } from '@trendy-tracker-schedular/storage';
import { TTAPI, Recruit } from '@trendy-tracker-schedular/ttapi';

interface Options {
  removedRecruitUrl: string;
  recruitList: Recruit[];
  id: string;
}

export async function deactivateRemovedRecruit({ removedRecruitUrl, recruitList, id }: Options) {
  await STORAGE.deactiveRecruit({ id, url: removedRecruitUrl });

  const recruitId = recruitList.find(x => x.url === removedRecruitUrl)?.id;

  if (recruitId != null) {
    await TTAPI.removeRecruit({ recruitId });

    await new Promise(r => setTimeout(r, 2000));
  }

  return { recruitId };
}
