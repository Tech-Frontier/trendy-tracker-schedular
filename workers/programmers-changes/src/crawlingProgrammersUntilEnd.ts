import { load } from 'cheerio';
import puppeteer from 'puppeteer';
import { MAX_PAGE } from './constants';

export async function crawlingProgrammersUntilEnd({
  jobCategory,
  getListUrl,
  maxPage = MAX_PAGE,
}: {
  jobCategory: string;
  getListUrl: (_: { pageNo: number }) => string;
  maxPage?: number;
}) {
  let pageNo = 1;
  const result = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(`[${getListUrl({ pageNo })}] 수집 중...`);
    const list = await crawlingProgrammers({
      jobCategory,
      listUrl: getListUrl({ pageNo }),
    });

    if (list.length === 0) {
      console.log(`[${getListUrl({ pageNo })}] 0개. 수집 종료.`);
      break;
    }

    console.log(`[${getListUrl({ pageNo })}] ${list.length}개. 수집 계속 진행.`);
    result.push(...list);

    await delay(5000);

    pageNo++;

    if (pageNo > maxPage) {
      console.log(`수집 최대 페이지인 100페이지까지 도달하여 중단합니다.`);
      break;
    }
  }

  return result;
}

async function crawlingProgrammers({ jobCategory, listUrl }: { jobCategory: string; listUrl: string }) {
  const recruitList = [];
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(listUrl);
  const listSelector = '.list-positions';
  const itemSelector = 'li.list-position-item';

  const html = await page.$eval(listSelector, el => el.innerHTML);

  const list = load(html)(itemSelector);

  const exposeTag = '.item-body > div:nth-child(2)';
  const nameTag = '.item-body > .company-name > a';
  const nameTag2 = '.item-body > .company-name > span';

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const urlText = load(item)(exposeTag).html();
    const company = load(item)(nameTag).html()?.trim();
    const companyFromWanted = load(item)(nameTag2).html()?.trim();
    const isWanted = company == null && companyFromWanted != null;

    if (urlText == null) {
      console.error(`urlText is null (i: ${i}, item: ${item}, exposeTag: ${exposeTag})`);
      continue;
    }

    const url = getURL({ text: urlText, isWanted });
    recruitList.push({
      url,
      company: (isWanted ? companyFromWanted : company) as string,
      jobCategory,
    });
  }

  await browser.close();

  return recruitList;
}

function getURL({ text, isWanted }: { text: string; isWanted: boolean }) {
  /**
   * NOTE: text is following text
<img data-src="/api/expose?trackable_type=JobPosition&amp;trackable_id=18039&amp;current_url=career.programmers.co.kr%252Fjob%253Fpage%253D1%2526order%253Drecent%2526job_category_ids%253D4" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" lazy="loading">
   */
  const start = text.indexOf('trackable_id');
  const slicedText = text.slice(start);
  const end = slicedText.indexOf('&');
  const id = Number(slicedText.slice(0, end).replace('trackable_id=', ''));

  if (isWanted) {
    return `https://www.wanted.co.kr/wd/${id}`;
  }

  return `https://career.programmers.co.kr/job_positions/${id}`;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
