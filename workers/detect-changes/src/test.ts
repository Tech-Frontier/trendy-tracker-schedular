import dotenv from 'dotenv';
dotenv.config();

import metadata from './metadata';
import { PUPPETEER } from './puppeteer/index';

(async () => {
  for(const { name, url, listSelector, itemSelector } of metadata) {
    const list = await PUPPETEER.scrapRecruitList({
      url,
      listSelector,
      itemSelector,
    });

    console.log(`✅ ${name} (${url})`);

    for (let index = 0; index < list.length; index++) {
      const url = list[index];
      const indexing = String(index + 1).padStart(3, "0");
      console.log(`[${indexing}] ${url}`);
    }
  }
})();
