// indexedDBUtils.js
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MenuDatabase", 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("menu")) {
        db.createObjectStore("menu", { keyPath: "menu_item_id" });
      }
    };
    request.onerror = (e) => {
      reject("Error opening database: " + e.target.error);
    };
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
  });
};

export const storeMenuItems = async (menuItems) => {
  const db = await openDB();
  const transaction = db.transaction("menu", "readwrite");
  const store = transaction.objectStore("menu");
  menuItems.forEach(item => store.put(item));

  transaction.oncomplete = () => {
    console.log("Menu items stored successfully.");
  };

  transaction.onerror = (e) => {
    console.error("Error storing menu items:", e.target.error);
  };
};

export const getMenuItems = async () => {
  const db = await openDB();
  const transaction = db.transaction("menu", "readonly");
  const store = transaction.objectStore("menu");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
    request.onerror = (e) => {
      reject("Error retrieving menu items: " + e.target.error);
    };
  });
};
