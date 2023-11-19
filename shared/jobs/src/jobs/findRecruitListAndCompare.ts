import { STORAGE } from '@trendy-tracker-schedular/storage';
import { compareLists } from './utils';

interface Options {
  id: string;
  recruitUrlList: string[];
}

export async function findRecruitListAndCompare({ id, recruitUrlList }: Options) {
  const { data: prevRecruitList } = await STORAGE.getRecruitList({ id });
  const prevRecruitUrlList = prevRecruitList.filter(x => x.status === 'active').map(x => x.url);

  return { prevRecruitList, ...compareLists(prevRecruitUrlList, recruitUrlList) };
}
