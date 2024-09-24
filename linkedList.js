export function createList() {
  let listHead = null;
  let listTail = null;
  let listSize = 0;

  function createNode(key = null, value = null, nextNode = null) {
    return { key, value, nextNode };
  }

  // Append a key-value pair to the end of the list
  const append = (key, value) => {
    const node = createNode(key, value);
    if (listSize === 0) {
      listHead = node;
      listTail = node;
    } else {
      listTail.nextNode = node;
      listTail = node;
    }
    listSize++;
  };

  // Prepend a key-value pair to the beginning of the list
  const prepend = (key, value) => {
    let node = createNode(key, value);
    if (listSize === 0) {
      listTail = node;
      listHead = node;
    } else {
      node.nextNode = listHead;
      listHead = node;
    }
    listSize++;
  };

  // Return the size of the list
  const size = () => {
    return listSize;
  };

  // Return the head of the list
  const head = () => {
    return listHead;
  };

  // Return the tail of the list
  const tail = () => {
    return listTail;
  };

  // Return the node at a given index
  const at = (index) => {
    let node = listHead;

    for (let i = 0; i < index; i++) {
      node = node.nextNode;
    }

    return node;
  };

  // Pop the last node off the list
  const pop = () => {
    if (listSize === 0) return;

    if (listSize === 1) {
      listHead = null;
      listTail = null;
    } else {
      let node = at(listSize - 2);
      listTail = node;
      node.nextNode = null;
    }

    listSize--;
  };

  // Check if a key exists in the list
  const containsKey = (key) => {
    return find(key) !== null;
  };

  // Find the index of a node with the given key
  const find = (key) => {
    let node;
    for (let i = 0; i < listSize; i++) {
      node = at(i);
      if (node.key === key) {
        return i;
      }
    }
    return null;
  };

  // Convert the list to a string representation (with key-value pairs)
  const toString = () => {
    let string = "";
    let node = listHead;

    for (let i = 0; i < listSize; i++) {
      string += `( ${node.key}: ${node.value} ) -> `;
      node = node.nextNode;
    }
    return (string += "null");
  };

  // Insert a key-value pair at a given index
  const insertAt = (key, value, index) => {
    const node = createNode(key, value);

    if (index === 0) {
      node.nextNode = listHead;
      listHead = node;
      if (listSize === 0) listTail = node;
    } else if (index === listSize) {
      listTail.nextNode = node;
      listTail = node;
    } else {
      const prev = at(index - 1);
      const current = prev.nextNode;
      prev.nextNode = node;
      node.nextNode = current;
    }

    listSize++;
  };

  // Remove a node at a given index
  const removeAt = (index) => {
    if (index === 0) {
      if (listSize === 1) {
        listHead = null;
        listTail = null;
      } else {
        listHead = listHead.nextNode;
      }
    } else if (index === listSize - 1) {
      const prev = at(index - 1);
      prev.nextNode = null;
      listTail = prev;
    } else {
      const prev = at(index - 1);
      const current = prev.nextNode;
      prev.nextNode = current.nextNode;
    }

    listSize--;
  };

  return {
    get listHead() {
      return listHead;
    },
    get listTail() {
      return listTail;
    },
    get listSize() {
      return listSize;
    },
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    containsKey,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
