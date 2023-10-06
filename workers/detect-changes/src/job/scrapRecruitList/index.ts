import { load as getSelector, load } from 'cheerio';
import puppeteer from 'puppeteer';

// https://about.daangn.com/jobs/software-engineer-backend/#_filter
interface ScrapRecruitListOptions {
  url: string;
  waitSelector?: string;
  listSelector: string;
  itemSelector: string;
  linkSelector?: string;
  linkAttr?: string;
}

export async function scrapRecruitList(options: ScrapRecruitListOptions) {
  const { url, waitSelector, listSelector, itemSelector, linkSelector = 'a', linkAttr = 'href' } = options;
  const { origin } = new URL(url);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);

  if (waitSelector != null) {
    await page.waitForSelector(waitSelector);
  }

  const html = await page.$eval(listSelector, el => el.innerHTML);

  await browser.close();

  const list = getSelector(html)(itemSelector);

  const result = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const path = load(item)(linkSelector).attr(linkAttr);
    result.push([origin, path].join(''));
  }

  return result;
}

