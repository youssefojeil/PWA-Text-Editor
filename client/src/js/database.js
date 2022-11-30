import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate, 1');
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    
    console.log(request);
    const result = await request;

    console.log(`${result} saved to the database`);
    return result;
    
  } catch (error) {
    console.error('putDb not implemented', error);    
  }

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();