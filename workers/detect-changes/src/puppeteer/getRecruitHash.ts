import crypto from 'crypto';
import puppeteer from 'puppeteer';

export async function getRecruitHash(url: string, hashSelector = 'html') {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector(hashSelector);

  const html = await page.$eval(hashSelector, el => el.outerHTML);

  const hash = crypto.createHash('md5').update(html).digest('hex');

  await browser.close();

  return hash;
}
