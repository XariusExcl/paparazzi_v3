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

app.post(config.defaultUrl, (req, res) => {

  const urls = req.body.urls;

  if (!urls) {
    console.log('❌ Wrong JSON data sent');
    res.status(400).send('Wrong JSON data sent');
    return;
  }

  // const stringifiedUrls = req.body.urls.replace(/'/g, '"');

  // const urls = req.body.urls;

  /*
  if (!urls) {
    console.log('❌ No urls provided');
    res.status(400).send('No urls provided');
    return;
  };
  */

  console.log('🚀 Crawling started');

  Promise.all(urls.map(url => crawl(url)))
    .then(() => {
      console.log('✅ Crawling completed');
      res.status(200).send('Crawling completed')
    })
});

app.listen(config.port);
console.log('🖥️ Paparazzi server listening on port ' + config.port + '.');
