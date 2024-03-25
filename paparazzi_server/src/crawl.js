import puppeteer from "puppeteer";
import config from "../config.js";

const crawl = async (url) => {
  console.log(`🕷️Crawling ${url}`)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  page.setViewport({
    width: config.width,
    height: config.height,
    deviceScaleFactor: 1,
  });

  const domain = new URL(url).hostname;
  await new Promise(resolve => setTimeout(resolve, config.captureDelay));
  await page.screenshot({fullPage: config.fullPage, path: `./public/${domain}.png`});

  await browser.close();
}

export default crawl;
