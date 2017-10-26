(function Storage(win, lib) {
  let hasLocalStorage;
  const _storage = {};

  try {
    hasLocalStorage = ('localStorage' in win) && localStorage !== null;
  } catch (e) {
    hasLocalStorage = false;
  }

  lib.storage = Object.assign({}, {
    hasLocalStorage,
    get(key) {
      let obj;

      if (this.hasLocalStorage) {
        const value = localStorage.getItem(key);
        try {
          obj = JSON.parse(value);
        } catch (e) {
          obj = value;
        }
      } else {
        obj = _storage[key];
      }

      if (obj && obj.data) {
        if (!('expire' in obj) || obj.expire > Date.now()) {
          return obj.data;
        }
        this.remove(key);
      }
      return null;
    },
    set(key, value, expire) {
      const obj = {
        data: value
      };
      if (expire > 0) {
        obj.expire = Date.now() + expire * 1000;
      }

      if (this.hasLocalStorage) {
        localStorage.setItem(key, JSON.stringify(obj));
      } else {
        _storage[key] = obj;
      }
      return value;
    },
    remove(key) {
      if (this.hasLocalStorage) {
        localStorage.removeItem(key);
      } else {
        delete _storage[key];
      }
    },
    removeExpired() {
      Object.keys(localStorage).forEach((key) => {
        this.get(key);
      }, lib.storage);
    }
  });

  if (hasLocalStorage) {
    lib.storage.removeExpired();
  }
}(window, window.__UCLIB__ || (window.__UCLIB__ = {})));
