import express from 'express';
import serveIndex from 'serve-index';
import cors from 'cors';

import crawl from './src/crawl.js';
import template from './src/template.js';
import config from './config.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(config.staticUrl, serveIndex('public', {
  icons: true,
  view: 'details',
  template: template
}));
app.use(config.staticUrl, express.static('public'));
app.use(`404.png`, express.static('404.png'));
app.use(`studentInfo.js`, express.static('studentInfo.js'));

app.post("/", (req, res) => {

  const urls = req.body.urls;

  if (!urls) {
    console.log('❌ Wrong JSON data sent');
    res.status(400).send('Wrong JSON data sent');
    return;
  }

  console.log(`🚀 Crawling started, capture delay set to ${config.captureDelay}ms`);

  new Promise(async (resolve, reject) => {
    if (urls.length > config.maxBatchSize) {
      for (let i = 0; i < urls.length; i += config.maxBatchSize) {
        const batch = urls.slice(i, i + config.maxBatchSize);
        await Promise.all(batch.map(url => crawl(url)));
      }
    } else {
      await Promise.all(urls.map(url => crawl(url)));
    };
    resolve();
  }).then(() => {
    console.log('✅ Crawling completed');
    res.status(200).send('Crawling completed')
  })
  .catch((error) => {
    console.log('❌ Error during crawling', error);
    res.status(500).send('Error during crawling');
  });
});

app.listen(config.port);
console.log(`🖥️ Paparazzi server listening on port ${config.port}.`);