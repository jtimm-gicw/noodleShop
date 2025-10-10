// src/utils/storage.js
let Storage = null;

try {
  // Try native async-storage first
  // eslint-disable-next-line global-require
  Storage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  // Fallback for web (or if module resolution fails)
  Storage = {
    getItem: async (key) => {
      try {
        const val = localStorage.getItem(key);
        return val;
      } catch (err) {
        return null;
      }
    },
    setItem: async (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        /* ignore */
      }
    },
    removeItem: async (key) => {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        /* ignore */
      }
    },
    clear: async () => {
      try {
        localStorage.clear();
      } catch (err) {
        /* ignore */
      }
    }
  };
}

export default Storage;
