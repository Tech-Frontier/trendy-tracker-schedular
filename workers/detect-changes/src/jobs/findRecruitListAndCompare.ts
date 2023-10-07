import { PUPPETEER } from '../puppeteer/index';
import { STORAGE } from '../storage/index';
import { compareLists } from '../utils/compareLists';

interface Options {
  id: string;
  url: string;
  listSelector: string;
  itemSelector: string;
}

export async function findRecruitListAndCompare({ id, itemSelector, listSelector, url }: Options) {
  const { data: prevRecruitList } = await STORAGE.getRecruitList({ id });
  const prevRecruitUrlList = prevRecruitList.filter(x => x.status === 'active').map(x => x.url);
  const currentRecruitUrlList = await PUPPETEER.scrapRecruitList({
    url,
    listSelector,
    itemSelector,
  });

  return { prevRecruitList, ...compareLists(prevRecruitUrlList, currentRecruitUrlList) };
}
