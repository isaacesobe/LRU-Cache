const { Cache } = require("./Cache")

describe("LRU Cache", () => {
  test("should store and retrieve a value", () => {
    const cache = new Cache(2);

    cache.put("A", 10);

    expect(cache.get("A")).toBe(10);
  });

  test("should return -1 when key does not exist", () => {
    const cache = new Cache(2);

    expect(cache.get("A")).toBe(-1);
  });

  test("should remove the least recently used item", () => {
    const cache = new Cache(2);

    cache.put("A", 10);
    cache.put("B", 20);

    // A becomes most recently used
    expect(cache.get("A")).toBe(10);

    // B should now be removed
    cache.put("C", 30);

    expect(cache.get("B")).toBe(-1);
    expect(cache.get("A")).toBe(10);
    expect(cache.get("C")).toBe(30);
  });

  test("should update an existing key", () => {
    const cache = new Cache(2);

    cache.put("A", 10);
    cache.put("A", 100);

    expect(cache.get("A")).toBe(100);
  });

  test("updating an existing key should make it most recently used", () => {
    const cache = new Cache(2);

    cache.put("A", 10);
    cache.put("B", 20);

    // A becomes most recently used
    cache.put("A", 100);

    // B should now be the LRU
    cache.put("C", 30);

    expect(cache.get("B")).toBe(-1);
    expect(cache.get("A")).toBe(100);
    expect(cache.get("C")).toBe(30);
  });

  test("successful get should make the key most recently used", () => {
    const cache = new Cache(2);

    cache.put("A", 10);
    cache.put("B", 20);

    // A becomes most recently used
    cache.get("A");

    // B should be removed
    cache.put("C", 30);

    expect(cache.get("B")).toBe(-1);
    expect(cache.get("A")).toBe(10);
    expect(cache.get("C")).toBe(30);
  });

  test("should work with capacity of 1", () => {
    const cache = new Cache(1);

    cache.put("A", 10);
    expect(cache.get("A")).toBe(10);

    cache.put("B", 20);

    expect(cache.get("A")).toBe(-1);
    expect(cache.get("B")).toBe(20);
  });

  test("should handle multiple evictions correctly", () => {
    const cache = new Cache(2);

    cache.put("A", 10);
    cache.put("B", 20);
    cache.put("C", 30);

    expect(cache.get("A")).toBe(-1);
    expect(cache.get("B")).toBe(20);
    expect(cache.get("C")).toBe(30);

    cache.put("D", 40);

    expect(cache.get("B")).toBe(-1);
    expect(cache.get("C")).toBe(30);
    expect(cache.get("D")).toBe(40);
  });

  test("should throw an error for non-positive capacity", () => {
    expect(() => new Cache(0)).toThrow(
      "Capacity must be positive"
    );

    expect(() => new Cache(-1)).toThrow(
      "Capacity must be positive"
    );
  });

  test("should handle numeric keys", () => {
    const cache = new Cache(2);

    cache.put(1, "one");
    cache.put(2, "two");

    expect(cache.get(1)).toBe("one");
    expect(cache.get(2)).toBe("two");
  });
});