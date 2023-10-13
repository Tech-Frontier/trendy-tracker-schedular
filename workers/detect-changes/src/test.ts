import dotenv from 'dotenv';
dotenv.config();

import { JOBS } from './jobs/index';
import metadata from './metadata-test';

(async () => {
  for(const { id, name, url, itemSelector, listSelector, waitSelector } of (metadata as any)) {
    console.log(`[${name}] 분석 시작`);

    const { addedList, persistentList, removedList } = await JOBS.findRecruitListAndCompare({ id, itemSelector, listSelector, url, waitSelector });

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
