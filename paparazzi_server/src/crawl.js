import puppeteer from "puppeteer";
import config from "../config.js";
import fs from "fs";

const crawl = async (url) => {
  console.log(`🕷️ Crawling ${url}`)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    console.log(`🚀 ${url} loaded successfully!`);
  } catch (error) {
    console.error(`❌ ${error}`);
    await browser.close();
    return;
  }

  page.setViewport({
    width: config.width,
    height: config.height,
    deviceScaleFactor: 1,
  });
  
  const urlObject = new URL(url);
  const directory = `./public/${urlObject.hostname}`;
  const pathname = (urlObject.pathname) ? 'index' : urlObject.pathname.replace(/\//g, '-').slice(1);
  await new Promise(resolve => setTimeout(resolve, config.captureDelay));
  if (!fs.existsSync
    (directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  await page.screenshot({fullPage: config.fullPage, path: `${directory}/${pathname}.png`});

  await browser.close();
}

export default crawl;
