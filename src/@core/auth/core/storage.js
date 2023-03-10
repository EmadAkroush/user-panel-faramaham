import { isUnset, decodeValue, encodeValue } from './utils';

export default class Storage {
  constructor() {}

  setLocalStorage(key, value) {
    if (isUnset(value)) {
      return this.removeLocalStorage(key);
    }

    try {
      localStorage.setItem(key, encodeValue(value));
    } catch (e) {
      throw e;
    }

    return value;
  }

  getLocalStorage(key) {
    const value = localStorage.getItem(key);

    return decodeValue(value);
  }

  removeLocalStorage(key) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
