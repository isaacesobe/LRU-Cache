# LRU Cache Implementation

A simple implementation of a **Least Recently Used (LRU) Cache** using JavaScript.

The cache supports `get()` and `put()` operations with **O(1) average time complexity**.

## Features

- Positive cache capacity
- `get(key)` retrieves a stored value
- Returns `-1` when a key doesn't exist
- A successful `get()` makes the key the most recently used
- `put()` inserts new key/value pairs
- `put()` updates existing keys
- Automatically removes the least recently used item when capacity is exceeded
- Includes automated tests
- Uses a Hash Map and Doubly Linked List for O(1) operations

## How It Works

The implementation uses two data structures:

### 1. Hash Map

A JavaScript `Map` provides constant-time access to cache entries.

```js
this.cache = new Map();
```

### 2. Doubly Linked List

The linked list keeps track of which items are:

- **Least Recently Used (LRU)** — near the head
- **Most Recently Used (MRU)** — near the tail

When an item is accessed or inserted, it is moved to the MRU position.

When the cache exceeds its capacity, the item closest to the head is removed.

## Example

```js
const cache = new Cache(2);

cache.put("A", 10);
cache.put("B", 20);

cache.get("A"); // 10

cache.put("C", 30);

cache.get("B"); // -1
cache.get("C"); // 30
cache.get("A"); // 10
```

### What happens?

Initially:

```text
[A, B]
```

After:

```js
cache.get("A");
```

`A` becomes the most recently used:

```text
[B, A]
```

Then:

```js
cache.put("C", 30);
```

The cache exceeds its capacity, so `B` is removed:

```text
[A, C]
```

Therefore:

```js
cache.get("B"); // -1
```

## Complexity

| Operation | Time Complexity |
|---|---|
| `get(key)` | O(1) average |
| `put(key, value)` | O(1) average |

Space complexity:

```text
O(capacity)
```

## Running the Tests

Install dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```

The test suite covers:

- Basic insertion and retrieval
- Missing keys
- LRU eviction
- Updating existing keys
- `get()` changing usage order
- Capacity of 1
- Multiple evictions
- Invalid capacity
- Numeric keys

## Project Structure

```text
lru-cache/
├── src/
│   ├── Cache.js
│   └── Cache.test.js
├── package.json
└── README.md
```

## Design Decision

A combination of a **Hash Map + Doubly Linked List** was chosen because using only an array or linked list would make finding or moving entries potentially O(n).

The Hash Map provides fast key lookup, while the Doubly Linked List allows entries to be removed and repositioned in constant time.