const sum = (a, b) => a + b
const subtract = (a, b) => a - b

// exports = { this works as well so why use module.exports?
// 	sum, subtract
// }

// https://www.youtube.com/watch?v=ghUIlSNRru0&list=PLC3y8-rFHvwh8shCMHFA5kWxD9PaPwxaY&index=15
// timestam: 4:41
// exports is has a reference to module.exports
// when you modify exports= {}
// it's breaks that refernce
// but node module only export the module.exports
/*

const obj1 = { name: "superman" }

let obj2 = obj1
obj2.name = "Clark Kent"

console.log(obj1.name) // will be clark kent
*/

module.exports = {
	sum, subtract
}