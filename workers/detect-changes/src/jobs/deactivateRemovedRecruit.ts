import { STORAGE } from '../storage/index';
import { Recruit } from '../ttapi/fetchRecruitList';
import { TTAPI } from '../ttapi/index';

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
