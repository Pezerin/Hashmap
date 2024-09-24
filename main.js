import { createHashmap } from "./hashmap.js";

const test = createHashmap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");

console.log(test.get("banana"));
