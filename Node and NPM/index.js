const lodash = require("lodash");

let characters = ["a", "b", "c", "d"];

let chunked = lodash.chunk(characters, 2);

console.log(chunked);
console.log(lodash.difference([2, 1], [2, 3]));
