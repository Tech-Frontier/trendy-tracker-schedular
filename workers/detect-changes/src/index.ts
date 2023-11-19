import { JOBS } from '@trendy-tracker-schedular/jobs';
import { TTAPI } from '@trendy-tracker-schedular/ttapi';
import dotenv from 'dotenv';
dotenv.config();

import metadata from './metadata';

(async () => {
  await TTAPI.healthCheck();

  for(const { id, company, jobCategory, name, url, itemSelector, listSelector, hashSelector, waitSelector } of (metadata as any)) {

    const recruitList = await TTAPI.fetchRecruitListByCompany({ company });

    console.log(`[${name}] 분석 시작`);

    const { prevRecruitList, addedList, persistentList, removedList } = await JOBS.findRecruitListAndCompare({ id, itemSelector, listSelector, url, waitSelector });

    console.log(`추가된 공고 (총 ${addedList.length})`);
    for (const addedRecruitUrl of addedList) {
      const options = { addedRecruitUrl, company, hashSelector, id, jobCategory };
      const { msg } = await JOBS.registerNewRecruit(options);

      console.log(`- ${addedRecruitUrl} [${msg}]`);
    }

    console.log(`유지된 공고 (총 ${persistentList.length})`);
    for (const persistentRecruitUrl of persistentList) {
      const options = { hashSelector, id, persistentRecruitUrl, prevRecruitList };
      const { currentHash, prevHash } = await JOBS.modifyUpdatedRecruit(options);

      if (prevHash !== currentHash) {
        console.log(`- ${persistentRecruitUrl} [변경됨] (${prevHash} => ${currentHash})`);
      } else {
        console.log(`- ${persistentRecruitUrl}`);
      }
    }

    console.log(`지워진 공고 (총 ${removedList.length})`);
    for (const removedRecruitUrl of removedList) {
      const { recruitId } = await JOBS.deactivateRemovedRecruit({ id, recruitList, removedRecruitUrl });

      if (recruitId == null) {
        console.log(`- ${removedRecruitUrl} [이미 지워져 있음]`);
      } else {
        console.log(`- ${removedRecruitUrl} [지워짐]`);
      }
    }
  }
})();
