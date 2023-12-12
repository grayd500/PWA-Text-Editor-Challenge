// client/src/js/editor.js:
// Import methods to save and get data from the indexedDB database in './database.js'
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';

export default class Editor {
  constructor() {
    // Initialize the editor with CodeMirror 6
    this.editor = new EditorView({
      doc: 'Type here...',  // Placeholder text
      extensions: [
        basicSetup,  // Basic setup with default keymap, input rules, etc.
        javascript(),  // JavaScript language support
      ],
      parent: document.querySelector('#main')  // The DOM element to mount the editor on
    });
  }
}

// Instantiate the Editor class when the script loads
new Editor();
