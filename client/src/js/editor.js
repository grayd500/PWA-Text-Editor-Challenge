// client/src/js/editor.js:
// Importing methods to interact with the indexedDB database from './database.js'
import { getDb, putDb } from './database';
// Importing the 'header' variable from './header.js'
import { header } from './header';

// Creating a class for handling the CodeMirror editor and data interactions
export default class {
  constructor() {
    // Retrieving data from localStorage
    const localData = localStorage.getItem('content');

    // Checking if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      // Throwing an error if CodeMirror is not loaded
      throw new Error('CodeMirror is not loaded');
    }

    // Initializing CodeMirror editor with specified options
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

    // When the editor is ready, set its value from indexedDB, localStorage, or use the default 'header' value
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // Saving the content of the editor to localStorage on every change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Saving the content of the editor to indexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
