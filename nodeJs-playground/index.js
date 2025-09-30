const path = require("node:path"); // node: says its an internal module

console.log(__filename)
console.log(__dirname)

console.log(path.basename(__filename))
console.log(path.basename(__dirname))

console.log(path.extname(__filename))
console.log(path.extname(__dirname))

console.log(path.parse(__filename)) // returns the url to json
console.log(path.format(path.parse(__filename))) // converts json to url

console.log(path.isAbsolute(__filename))
console.log(path.isAbsolute("./data.jsom"))

console.log(path.join("folder1", "folder2", "data.json")) // basic concatination
console.log(path.join("/folder1", "folder2", "data.json"))
console.log(path.join("/folder1", "//folder2", "data.json"))
console.log(path.join("/folder1", "//folder2", "../data.json")) // it normalises the result
/*
   folder1/folder2/data.json
   /folder1/folder2/data.json
   /folder1/folder2/data.json
   /folder1/data.json
*/

console.log(path.join(__dirname, "data.json"))


// if no forward slash - just concat and attach folder path in front
console.log(path.resolve("folder1", "folder2", "data.json"))
// if forward slash provided - consider that only
console.log(path.resolve("/folder1", "folder2", "data.json"))
// if there are two forward / consider the latest one
console.log(path.resolve("/folder1", "//folder2", "data.json"))
// normilises like join - but if the result has / the considers it
console.log(path.resolve("/folder1", "//folder2", "../data.json")) // it normalises the result