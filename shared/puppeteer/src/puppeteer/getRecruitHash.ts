import crypto from 'crypto';
import puppeteer, { Page } from 'puppeteer';

export async function getRecruitHash(url: string, hashSelector = 'html') {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);

  await retryWaitForSelector(page, hashSelector);

  const html = await page.$eval(hashSelector, el => el.outerHTML);

  const hash = crypto.createHash('md5').update(html).digest('hex');

  await browser.close();

  return hash;
}

async function retryWaitForSelector(page: Page,hashSelector: string ) {
  const MAX_RETRY_TIMES = 20;
  let count = 1;

  while (count < MAX_RETRY_TIMES) {
    try {
      await page.waitForSelector(hashSelector);

      return;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (error.message?.includes('TimeoutError')) {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        count++;
        continue;
      }

      throw error;
    }
  }

  throw new Error(`RetryError: 최대 재시도 횟수를 넘었습니다. (${count} >= ${MAX_RETRY_TIMES})`);
}
