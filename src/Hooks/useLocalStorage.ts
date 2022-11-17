import { useEffect, useMemo, useState } from 'react';
import StorageService from '../Service/storage';

function useLocalStorage<T = any>(key: string, initialValue?: T) {
  const resolvedInitialValue: T = useMemo(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = StorageService.getItem(key);
      if (item !== null) {
        return item;
      } else {
        if (initialValue) {
          StorageService.setItem(key, initialValue);
        }
        return initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  }, [initialValue, key]);
  const [storedValue, setStoredValue] = useState(resolvedInitialValue);

  const listener = (e: any) => {
    if (e.key === key) setValue(JSON.parse(e.newValue));
  };

  useEffect(() => {
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  const setValue = (value: T) => {
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
