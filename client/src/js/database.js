import { openDB } from 'idb';

// create db called "jate" using Version 1
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.      
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Put data on the database
export const putDb = async (content) => {

    console.log('PUT to the database');
    
    // create connection to the db 
    const db = await openDB('jate', 1);
    // create new transaction and specify the db & data privileges
    const tx = db.transaction('jate', 'readwrite');
    
    // Open desired object store
    const store = tx.objectStore('jate');
    // use put method and pass the content & id
    const request = store.put({ id: 1, value: content });
    
    console.log(request);

    // get confirmation of the request
    const result = await request;
    console.log(` data saved to the database`, result);
    return result;
    
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {

    console.log('GET all from the database');
    // Create a connection to the database database and version we want to use.
    const db = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.    
    const tx = db.transaction('jate', 'readonly');
    // Open up the desired object store.
    const store = tx.objectStore('jate');
    // Use the .get() method to get data in the database.
    const request = store.get(1);
    // Get confirmation of the request.
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();
