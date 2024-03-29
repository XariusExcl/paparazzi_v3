import './style.css'
import Alpine from 'alpinejs'
import server_conf from '../paparazzi_server/config.js'
 
window.Alpine = Alpine

const urlData = () => ({
  urls: [crypto.randomUUID()],
  parsedUrls: [],
  response: '',
  isLoading: false,
  addNewUrl() {
    this.urls.push({
      id: crypto.randomUUID() 
    });
  },
  removeUrl(url) {
    this.urls = this.urls.filter(u => u.id !== url.id);
  },
  generateUrls(){
    this.parsedUrls = [];
    const urlModels = [...document.querySelectorAll('[data-ref="urlModel"]')];
    urlModels.forEach((urlModel) => {
      const urlObject = this.parseUrlModel(urlModel);
      this.constructUrls("", urlObject.length - 1, urlObject)
    })
  },
  constructUrls(string, index, urlObject){
    if (index < 0) {
      this.parsedUrls.push(string);
      return;
    }
    if (Array.isArray(urlObject[index])) {
      for (let i = 0; i < urlObject[index].length; i++) {
        this.constructUrls(urlObject[index][i] + string, index - 1, urlObject);
      }
    } else {
      this.constructUrls(urlObject[index] + string, index - 1, urlObject);
    }
  },
  parseUrlModel(urlModel){
    const urlObject = [];
    // http or https
    urlObject.push(urlModel.querySelector('[data-ref="select"]').value);

    // Inputs
    const inputs = [...urlModel.querySelectorAll('[data-ref="input"]')];

    let currentRangeBegin = null;
    let currentRangeEnd = null;

    inputs.forEach((input) => { 
      // Find the type of input
      if (input.dataset.rangeBegin != undefined) {
        currentRangeBegin = input.value;
        return;
      } 
      if (input.dataset.rangeEnd != undefined) {
        currentRangeEnd = input.value;
        if (!isNaN(currentRangeBegin)) {
          const padNumbers = (currentRangeBegin[0] === '0') ? currentRangeBegin.length : 0;
          const length = parseInt(currentRangeEnd) - parseInt(currentRangeBegin) + 1;
          urlObject.push(window.paparazzi.range(length, parseInt(currentRangeBegin), padNumbers));
        } else {
          urlObject.push(window.paparazzi.characterRange(currentRangeBegin, currentRangeEnd));
        }
      } else {
        urlObject.push(input.value);
      }
    });
    return urlObject;
  },
  async crawl() {
    const apiUrl = 'http://localhost:' + server_conf.port + '/';
    this.response = '🚀 Captures en cours... Cette opération peut prendre quelques minutes.';
    this.isLoading = true;
    const res = await fetch(apiUrl, 
    {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({urls:this.parsedUrls})
    });
    try {
      if (res.ok) {
        this.response = `✅OK ! Vos captures d'écran sont sur ${apiUrl}${server_conf.staticUrl} !`;
      } else {
        this.response = `⚠️Quelques erreurs ! Vos captures d'écran valides sont sur ${apiUrl}${server_conf.staticUrl} !`;
      }
    } catch (error) {
      this.response = `❌ Erreur lors de la requête : ${error}`;
    }
    this.isLoading = false;
  }
});

const inputData = () => ({
  fields: [crypto.randomUUID()],
  addNewField() {
    this.fields.push({
      id: crypto.randomUUID()
    });
  },
  removeField(field) {
    this.fields = this.fields.filter(f => f.id !== field.id);
  }
})

Alpine.data('urlData', urlData);
Alpine.data('inputData', inputData);
 
Alpine.start();

window.paparazzi = {
  range: (size, startAt = 0, padNumbers) => [...Array(size).keys()].map(i => String(i + startAt).padStart(padNumbers, '0')),
  characterRange: (startChar, endChar) => [...String.fromCharCode(...window.paparazzi.range(endChar.charCodeAt(0) - startChar.charCodeAt(0) + 1, startChar.charCodeAt(0)))] 
}