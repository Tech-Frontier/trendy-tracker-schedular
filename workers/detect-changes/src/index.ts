import dotenv from 'dotenv';
dotenv.config();

import { JOBS } from './jobs/index';
import metadata from './metadata';
import { TTAPI } from './ttapi';

(async () => {
  for(const { id, company, occupation, name, url, itemSelector, listSelector, hashSelector } of metadata) {
    const recruitList = await TTAPI.fetchRecruitListByCompany({ company });

    console.log(`[${name}] 분석 시작`);

    const { prevRecruitList, addedList, persistentList, removedList } = await JOBS.findRecruitListAndCompare({ id, itemSelector, listSelector, url });

    console.log(`추가된 공고 (총 ${addedList.length})`);
    for (const addedRecruitUrl of addedList) {
      const options = { addedRecruitUrl, company, hashSelector, id, occupation };
      const { msg } = await JOBS.registerNewRecruit(options);

      console.log(`- ${addedRecruitUrl} [${msg}]`);
    }

    console.log(`유지된 공고 (총 ${persistentList.length})`);
    for (const persistentRecruitUrl of persistentList) {
      const options = { hashSelector, id, persistentRecruitUrl, prevRecruitList };
      const { currentHash, prevHash } = await JOBS.modifyUpdatedRecruit(options);

      if (prevHash !== currentHash) {
        console.log(`- ${persistentRecruitUrl} [변경됨] (${prevHash} => ${currentHash})`);
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
