// like common js - add js is loaded in index.js
// by this way we do default export
const add = require("./add.js"); // can use any name
const superHero = require("./super-hero.js");

console.log("hello from node.js", add(1, 6))

require("./superman") // one value from one module doeswn't modify other
require("./batman") // reason iife (allows you to repaeat variable or function names)

// each loaded module in node.js is wrapped with an IIFE that provides private scoping
var i = 10;
(function abc() {
   console.log("hi abcss") 
})()


const data = require("./data.json") // require will convert this to a json object
// const data = require("./data") -> this works as well but it will try to look for .js file first

console.log("data", data)