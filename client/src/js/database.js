// client/src/js/database.js:
import { openDB } from 'idb';

// Initialize the database
const initdb = async () => {
  try {
    await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('jate')) {
          db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
          console.log('jate database created');
        } else {
          console.log('jate database already exists');
        }
      },
    });
  } catch (error) {
    console.error('Error initializing the database', error);
  }
};

// Add logic to a method that accepts some content and adds it to the database
// Get the last record from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const getAllKeysRequest = store.getAllKeys();
    const keys = await getAllKeysRequest;
    const lastKey = keys.at(-1); // Get the last key (most recent entry)
    const result = await store.get(lastKey);
    console.log('Data fetched from the database', result);
    return result?.jate;
  } catch (error) {
    console.error('Error getting data from the database', error);
  }
};


// Add logic for a method that gets the content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.get(1);
    console.log('Data fetched from the database', result);
    return result?.jate;
  } catch (error) {
    console.error('Error getting data from the database', error);
  }
};

initdb();
