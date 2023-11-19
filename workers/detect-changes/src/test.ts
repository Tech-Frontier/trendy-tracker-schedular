import { JOBS } from '@trendy-tracker-schedular/jobs';
import { PUPPETEER } from '@trendy-tracker-schedular/puppeteer';
import dotenv from 'dotenv';
dotenv.config();

import metadata from './metadata-test';

(async () => {
  for(const { id, name, url, itemSelector, listSelector, waitSelector } of (metadata as any)) {
    console.log(`[${name}] 분석 시작`);

    const recruitUrlList = await PUPPETEER.scrapRecruitList({ url, listSelector, itemSelector, waitSelector });
    const { addedList, persistentList, removedList } = await JOBS.findRecruitListAndCompare({ id, recruitUrlList });

    console.log(`추가된 공고 (총 ${addedList.length})`);
    for (const addedRecruitUrl of addedList) {
      // const options = { addedRecruitUrl, company, hashSelector, id, jobCategory };
      // const { msg } = await JOBS.registerNewRecruit(options);

      console.log(`- ${addedRecruitUrl}`);
    }

    console.log(`유지된 공고 (총 ${persistentList.length})`);
    for (const persistentRecruitUrl of persistentList) {
      console.log(`- ${persistentRecruitUrl}`);
    }

    console.log(`지워진 공고 (총 ${removedList.length})`);
    for (const removedRecruitUrl of removedList) {
      console.log(`- ${removedRecruitUrl}`);
    }
  }
})();
