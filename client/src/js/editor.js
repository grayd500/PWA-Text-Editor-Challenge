// editor.js

// Importing methods to interact with the indexedDB database from './database.js'
import { getDb, putDb } from './database';
// Importing the 'header' variable from './header.js'
import { header } from './header';

// Editor class to handle the CodeMirror editor and data interactions
export default class Editor {
  constructor() {
    // Attempt to retrieve any previously saved data from localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is available in the global scope
    if (typeof CodeMirror === 'undefined') {
      // If CodeMirror is not found, throw an error to halt execution
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize the CodeMirror editor with options for JavaScript editing
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: localData || header, // Set the initial value to localData or header if localData is null
      mode: 'javascript', // Set the language mode to JavaScript
      theme: 'monokai', // Set the editor theme
      lineNumbers: true, // Display line numbers
      lineWrapping: true, // Wrap lines that are too long
      autofocus: true, // Automatically focus the editor
      indentUnit: 2, // Set the number of spaces for indentation
      tabSize: 2, // Set the width of a tab character
    });

    // When the editor is ready, set its value from indexedDB, localStorage, or use the default 'header' value
getDb().then((data) => {
  // Now 'data' is guaranteed to be a string.
  console.info('Loaded data from IndexedDB, injecting into editor');
  this.editor.setValue(data || localData || header);
}).catch((err) => {
  // If there's an error, log it and use 'header' as a fallback.
  console.error('Failed to load data from IndexedDB:', err);
  this.editor.setValue(localData || header);
});

    // Add a change event listener to the editor
    this.editor.on('change', () => {
      // Save the current content of the editor to localStorage whenever a change is made
      localStorage.setItem('content', this.editor.getValue());
    });

    // Add a blur event listener to the editor
    this.editor.on('blur', () => {
      // Log when the editor loses focus
      console.log('The editor has lost focus');
      // Retrieve the current content of the editor
      const editorValue = this.editor.getValue();
      // Save the content to IndexedDB using putDb
      putDb(editorValue);
    });
  }
}
