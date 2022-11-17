const Storage = window.localStorage;

class StorageService {
  getItem<V = any>(key: string) {
    const item = Storage.getItem(key);
    if (item) return JSON.parse(item) as V;
    else return null;
  }
  setItem<V = any>(key: string, value: V) {
    const newValue = JSON.stringify(value);
    Storage.setItem(key, newValue);
    const event = new StorageEvent('storage', {
      key,
      newValue
    });
    window.dispatchEvent(event);
  }
  removeItem = (key: string) => {
    Storage.removeItem(key);
  };
}

export default new StorageService();
