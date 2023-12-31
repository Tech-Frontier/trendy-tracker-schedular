import { JOBS } from '@trendy-tracker-schedular/jobs';
import { PUPPETEER } from '@trendy-tracker-schedular/puppeteer';
import { TTAPI } from '@trendy-tracker-schedular/ttapi';
import { crawlingProgrammersUntilEnd } from './crawlingProgrammersUntilEnd';

const ProgramersURL: Record<string, (_:{pageNo:number}) => string> = {
  frontend: ({ pageNo }: { pageNo: number }) => `https://career.programmers.co.kr/job?page=${pageNo}&order=recent&job_category_ids=4`,
  backend: ({ pageNo }: { pageNo: number }) => `https://career.programmers.co.kr/job?page=${pageNo}&order=recent&job_category_ids=1`
};

async function getProgrammersRecruitList({ jobCategory }: { jobCategory: string }) {
  return await crawlingProgrammersUntilEnd({
    jobCategory,
    getListUrl: (_) => ProgramersURL[jobCategory](_)
  });
}

type RecruitInfo = Awaited<ReturnType<typeof getProgrammersRecruitList>>[number];

function listToMap(list: RecruitInfo[]) {
  const map = new Map<RecruitInfo['company'], RecruitInfo[]>();

  for (const item of list) {
    map.set(item.company, [...(map.get(item.company) ?? []), item]);
  }

  return map;
}

(async () => {
  const jobCategories = ['frontend', 'backend'] as const;
  const HASH_SELECTOR = {
    'programmers': '#career-app-legacy > div > div > div',
    'wanted': '#__next div:nth-child(3) > div > div> div:nth-child(1)',
  };

  for (const jobCategory of jobCategories) {
    const list = await getProgrammersRecruitList({ jobCategory });
    const map = listToMap(list);

    for (const [company, programmersRecruitList] of map) {
      const id = `${company}-${jobCategory}`;
      const { prevRecruitList, addedList, persistentList, removedList } = await JOBS.findRecruitListAndCompare({
        id,
        recruitUrlList: programmersRecruitList.map(x => x.url),
      });

      console.log(`[${id}] 추가된 공고 (총 ${addedList.length})`);
      for (const addedRecruitUrl of addedList) {
        const isWanted = addedRecruitUrl.startsWith('https://www.wanted.co.kr');
        const hash = await PUPPETEER.getRecruitHash(addedRecruitUrl, HASH_SELECTOR[isWanted ? 'wanted' : 'programmers']);

        const { msg } = await JOBS.registerNewRecruit({ addedRecruitUrl, company, hash, id, jobCategory });

        console.log(`- ${addedRecruitUrl} [${msg}]`);
      }

      console.log(`[${id}] 유지된 공고 (총 ${persistentList.length})`);
      for (const persistentRecruitUrl of persistentList) {
        const isWanted = persistentRecruitUrl.startsWith('https://www.wanted.co.kr');
        const hash = await PUPPETEER.getRecruitHash(persistentRecruitUrl, HASH_SELECTOR[isWanted ? 'wanted' : 'programmers']);

        const options = { hash, id, persistentRecruitUrl, prevRecruitList };
        const { currentHash, prevHash } = await JOBS.modifyUpdatedRecruit(options);

        if (prevHash !== currentHash) {
          console.log(`- ${persistentRecruitUrl} [변경됨] (${prevHash} => ${currentHash})`);
        } else {
          console.log(`- ${persistentRecruitUrl}`);
        }
      }

      console.log(`[${id}] 지워진 공고 (총 ${removedList.length})`);
      const recruitList = await TTAPI.fetchRecruitListByCompany({ company });
      for (const removedRecruitUrl of removedList) {
        const { recruitId } = await JOBS.deactivateRemovedRecruit({ id, recruitList, removedRecruitUrl });

        if (recruitId == null) {
          console.log(`- ${removedRecruitUrl} [이미 지워져 있음]`);
        } else {
          console.log(`- ${removedRecruitUrl} [지워짐]`);
        }
      }

    }

    console.log(`${jobCategory}-------`);
    console.log(JSON.stringify(list, null, 2));
  }
})();
