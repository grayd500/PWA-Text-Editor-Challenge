// client/src/js/editor.js:
// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class Editor {
  constructor() {
    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize the editor
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Variables to track content changes
    this.lastSavedContent = '';
    this.contentChanged = false;

    // Event listener for content change
    this.editor.on('change', () => {
      this.contentChanged = true;
    });

    // Event listener for editor blur (losing focus)
    this.editor.on('blur', () => {
      const currentContent = this.editor.getValue();
      if (this.contentChanged && currentContent !== this.lastSavedContent) {
        console.log('Saving content to database:', currentContent);
        putDb(currentContent)
          .then(() => {
            console.log('Data was saved successfully!');
            this.lastSavedContent = currentContent;
            this.contentChanged = false;
          })
          .catch((error) => {
            console.error('Failed to save data:', error);
          });
      }
    });

    // Load content from IndexedDB when the editor is ready
    getDb().then((content) => {
      this.editor.setValue(content || header);
      this.lastSavedContent = content || header;
    });
  }
}
