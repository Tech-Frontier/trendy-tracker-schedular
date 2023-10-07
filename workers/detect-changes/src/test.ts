import dotenv from 'dotenv';
dotenv.config();

import { getRecruitList } from './actions';
import { addRecruit } from './actions/addRecruit';
import { deactiveRecruit } from './actions/deactiveRecruit';
import { getRecruitHash } from './actions/getRecruitHash';
import { scrapRecruitList } from './job/index';
import metadata from './metadata';
import { fetchRecruitListByCompany } from './ttapi/fetchRecruitList';
import { registerRecruit } from './ttapi/registerRecruit';
import { removeRecruit } from './ttapi/removeRecruit';
import { compareLists } from './utils/compareLists';

(async () => {
  for(const { id, company, occupation, name, url, itemSelector, listSelector, hashSelector } of metadata) {
    const recruitList = await fetchRecruitListByCompany({ company });

    console.log(`[${name}] 분석 시작`);
    const { data: prevRecruitList } = await getRecruitList({ id });
    const prevRecruitUrlList = prevRecruitList.filter(x => x.status === 'active').map(x => x.url);
    const currentRecruitUrlList = await scrapRecruitList({
      url,
      listSelector,
      itemSelector,
    });

    const { addedList, persistentList, removedList } = compareLists(prevRecruitUrlList, currentRecruitUrlList);

    console.log(`추가된 공고 (총 ${addedList.length})`);
    for (const addedRecruitUrl of addedList) {
      await addRecruit({
        id,
        url: addedRecruitUrl,
        hash: await getRecruitHash(addedRecruitUrl, hashSelector),
        status: 'active'
      });

      // TODO: 등록 API
      const msg = await registerRecruit({
        company,
        occupation,
        url: addedRecruitUrl,
      });

      console.log(`- ${addedRecruitUrl} [${msg}]`);

      await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`유지된 공고 (총 ${persistentList.length})`);
    for (const persistentRecruitUrl of persistentList) {
      const prevHash = prevRecruitList.find(x => x.url === persistentRecruitUrl)!.hash;
      const currentHash = await getRecruitHash(persistentRecruitUrl, hashSelector);

      if (prevHash === currentHash) {
        console.log(`- ${persistentRecruitUrl}`);
      } else {
        console.log(`- ${persistentRecruitUrl} [변경됨] (${prevHash} => ${currentHash})`);
        await addRecruit({
          id,
          url: persistentRecruitUrl,
          hash: currentHash,
          status: 'active'
        });

        // TODO: 수정 API
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    console.log(`지워진 공고 (총 ${removedList.length})`);
    for (const removedRecruitUrl of removedList) {
      console.log(`- ${removedRecruitUrl}`);

      await deactiveRecruit({ id, url: removedRecruitUrl });

      const recruitId = recruitList.find(x => x.url === removedRecruitUrl)?.id;

      if (recruitId == null) {
        console.error(`recruitId를 찾을 수 없습니다. (${removedRecruitUrl})`);
      } else {
        await removeRecruit({ recruitId });
      }

      await new Promise(r => setTimeout(r, 2000));
    }
  }
})();
