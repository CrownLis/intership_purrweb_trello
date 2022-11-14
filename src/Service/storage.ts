const Storage = window.localStorage;

class StorageService {
  getItem<V = any>(key: string) {
    const item = Storage.getItem(key);
    if (item) return JSON.parse(item) as V;
    else return null;
  }
  setItem<V = any>(key: string, value: V) {
    Storage.setItem(key, JSON.stringify(value));
  }
  removeItem = (key: string) => {
    Storage.removeItem(key);
  };
}

export default new StorageService();
