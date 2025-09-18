const inputArray = ["india", "england"]


// map returns a completely new array
const op = inputArray.map(e => {
  return `${e}-abc`
});

console.log("op", op)

Array.prototype.proxyMap = function (cb) {
	// as map returns a new array so
	let temp = []
	for (let i = 0; i < this.length; i++) {
		temp.push(cb(this[i], i, this))
	}
	return temp
}

const proxyOutPut = inputArray.proxyMap((elem, i, arr) => {
	return elem + "-def"
})

console.log("proxyOutPut", proxyOutPut)