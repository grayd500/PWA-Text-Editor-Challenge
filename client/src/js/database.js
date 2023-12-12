// client/src/js/database.js:
// Import the openDB function from the 'idb' library for IndexedDB operations
import { openDB } from 'idb';

// Initialize the database, creating it if it doesn't exist, using version 1
const initdb = async () => {
  // Creating a new database or upgrading an existing one to version 1
  openDB('jate', 1, {
    // Add database schema if it hasn't already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for data with a key named 'id' that auto-increments
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Add logic to a method that accepts content and adds it to the database
export const putDb = async (content) => {
  // Connect to the 'jate' database with version 1
  const jateDb = await openDB('jate', 1);
  // Create a new transaction for read and write privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open the object store
  const store = tx.objectStore('jate');
  // Put the content into the object store with a specified ID
  const request = store.put({ id: 1, value: content });
  // Confirm that the data was added successfully
  const result = await request;
  console.log('Data saved to the database', result);
};

// Add logic for a method that retrieves all content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Connect to the 'jate' database with version 1
  const jateDB = await openDB('jate', 1);
  // Create a new transaction for read-only privileges
  const tx = jateDB.transaction('jate', 'readonly');
  // Open the desired object store
  const store = tx.objectStore('jate');
  // Get all data from the object store
  const request = store.getAll();
  // Get confirmation of the request
  const result = await request;
  console.log(result);
  return result;
};

// Initialize the database when the script is run
initdb();