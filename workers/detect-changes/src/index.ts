import { scrapRecruitList } from './job';
import metadata from './metadata';

(async () => {
  for(const { name, url, listSelector, itemSelector } of metadata) {
    const list = await scrapRecruitList({
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
