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

// Ensure the getDb function returns a string.
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('Data retrieved from the database', result);
  // Only return result.value if it's a string, otherwise return an empty string.
  return typeof result?.value === 'string' ? result.value : '';
};


// Initialize the database when the script is run
initdb();