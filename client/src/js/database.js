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
export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, jate: content });
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  } catch (error) {
    console.error('Error putting data in the database', error);
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
