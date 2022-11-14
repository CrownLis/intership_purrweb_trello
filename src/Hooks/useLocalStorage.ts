import { useMemo, useState } from 'react';
import StorageService from '../Service/storage';

function useLocalStorage<V = any>(key: string, initialValue: V) {
  const resolvedInitialValue: V = useMemo(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = StorageService.getItem(key);
      if (item !== null) {
        return item;
      } else {
        StorageService.setItem(key, initialValue);
        return initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  }, [initialValue, key]);
  const [storedValue, setStoredValue] = useState(resolvedInitialValue);
  const setValue = (value: V) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        StorageService.setItem(key, value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export default useLocalStorage;
