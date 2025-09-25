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
   console.log("hi abc") 
})()

console.log("get super hero name", superHero.getName())
superHero.setName("Batman")
console.log("get super hero name batman", superHero.getName())

const superHero2 = require("./super-hero.js")

// should be Spiderman - but will be batman
// cause in node once the module is required it's cached
console.log("super hero after redeclare", superHero2.getName())