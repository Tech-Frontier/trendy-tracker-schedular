import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://google.com');
  const title = await page.title();

  console.log({ title });

  await browser.close();
})();
