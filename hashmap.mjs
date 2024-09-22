import { createList } from "./linkedList.mjs";

function createHashmap() {
  let buckets = new Array(16);
  let length = 0;
  const loadFactor = 0.75;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }

    return hashCode;
  }

  function set(key, value) {
    const code = hash(key);
    if (code < 0 || code >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!buckets[code]) {
      buckets[code] = createList();
      buckets[code].append(key, value);
      length++;
    } else {
      let current = buckets[code].listHead;
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        current = current.nextNode;
      }

      buckets[code].append(key, value);
      length++;
    }

    // If length exceeds buckets * load factor, double buckets
    if (length > buckets.length * loadFactor) {
      let arr = new Array(buckets.length * 2);
      let entriesList = entries();

      for (let i = 0; i < entriesList.length; i++) {
        let [key, value] = entriesList[i];
        let code = hash(key) % arr.length;
        if (code < 0 || code >= arr.length) {
          throw new Error("Trying to access index out of bound");
        }

        if (!arr[code]) {
          arr[code] = createList();
          arr[code].append(key, value);
        } else {
          arr[code].append(key, value);
        }
      }

      buckets = arr;
    }
  }

  function get(key) {
    const code = hash(key);
    if (code < 0 || code >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    let current = buckets[code].listHead;
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.nextNode;
    }

    return null;
  }

  function has(key) {
    const code = hash(key);
    if (code < 0 || code >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    let current = buckets[code].listHead;
    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  function remove(key) {
    const code = hash(key);
    if (code < 0 || code >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    let current = buckets[code].listHead;
    let index = 0;
    while (current) {
      if (current.key === key) {
        buckets[code].removeAt(index);
        return true;
      }
      current = current.nextNode;
      index++;
    }

    return false;
  }

  function length() {
    return length;
  }

  function clear() {
    const currentSize = buckets.length;
    buckets = new Array(currentSize);
    length = 0;
  }

  function keys() {
    let keys = [];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        let current = buckets[i].listHead;
        while (current) {
          keys.push(current.key);
          current = current.nextNode;
        }
      }
    }

    return keys;
  }

  function values() {
    let values = [];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        let current = buckets[i].listHead;
        while (current) {
          values.push(current.value);
          current = current.nextNode;
        }
      }
    }

    return values;
  }

  function entries() {
    let entries = [];

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        let current = buckets[i].listHead;
        while (current) {
          entries.push([current.key, current.value]);
          current = current.nextNode;
        }
      }
    }

    return entries;
  }

  return { hash, set, get, has, remove, length, clear, keys, values, entries };
}
