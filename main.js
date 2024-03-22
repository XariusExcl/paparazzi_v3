import './style.css'
import Alpine from 'alpinejs'
 
window.Alpine = Alpine

const urlData = () => ({
  urls: [crypto.randomUUID()],
  addNewUrl() {
    this.urls.push({
      id: crypto.randomUUID() 
    });
  },
  removeUrl(url) {
    this.urls = this.urls.filter(u => u.id !== url.id);
  },
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