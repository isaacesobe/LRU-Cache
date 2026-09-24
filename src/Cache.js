class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Cache {
  constructor(capacity) {
    if (capacity <= 0) {
      throw new Error("Capacity must be positive");
    }

    this.capacity = capacity;
    this.cache = new Map();

    // Dummy nodes
    this.head = new Node(null, null);
    this.tail = new Node(null, null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Remove a node from the linked list
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Add a node right before the tail
  addToRecent(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;

    this.tail.prev.next = node;
    this.tail.prev = node;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key);

    // It was just accessed, so make it most recently used
    this.remove(node);
    this.addToRecent(node);

    return node.value;
  }

  put(key, value) {
    // If key already exists, remove old node
    if (this.cache.has(key)) {
      const existingNode = this.cache.get(key);
      this.remove(existingNode);
    }

    const newNode = new Node(key, value);

    // Add/update cache
    this.cache.set(key, newNode);

    // New item is most recently used
    this.addToRecent(newNode);

    // Remove least recently used item if capacity is exceeded
    if (this.cache.size > this.capacity) {
      const lruNode = this.head.next;

      this.remove(lruNode);
      this.cache.delete(lruNode.key);
    }
  }
}

module.exports = { Cache }