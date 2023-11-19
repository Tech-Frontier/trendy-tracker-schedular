import { STORAGE } from '@trendy-tracker-schedular/storage';
import { PUPPETEER } from '../puppeteer/index';
import { compareLists } from '../utils/compareLists';

interface Options {
  id: string;
  url: string;
  listSelector: string;
  itemSelector: string;
  waitSelector?: string;
}

export async function findRecruitListAndCompare({ id, itemSelector, listSelector, url, waitSelector }: Options) {
  const { data: prevRecruitList } = await STORAGE.getRecruitList({ id });
  const prevRecruitUrlList = prevRecruitList.filter(x => x.status === 'active').map(x => x.url);
  const currentRecruitUrlList = await PUPPETEER.scrapRecruitList({
    url,
    listSelector,
    itemSelector,
    waitSelector,
  });

  return { prevRecruitList, ...compareLists(prevRecruitUrlList, currentRecruitUrlList) };
}
