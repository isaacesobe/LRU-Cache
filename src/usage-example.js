const { Cache } = require("./Cache");

const cache = new Cache(2);

cache.put(1, "A");
cache.put(2, "B");

console.log("get(1):", cache.get(1));

cache.put(3, "C");

console.log("get(2):", cache.get(2));
console.log("get(1):", cache.get(1));
console.log("get(3):", cache.get(3));
