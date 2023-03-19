import { openDB } from "idb";

const initdb = async () =>
  openDB("Texter", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("Texter")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("Texter", { keyPath: "id", autoIncrement: true });
      console.log("Texter database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error("putDb not implemented");

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const texterDb = await openDB("Texter", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = texterDb.transaction("Texter", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("Texter");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
