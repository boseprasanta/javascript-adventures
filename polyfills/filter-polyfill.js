const inputArray = [1, 2, 3, 4, 5, 6]


// filter returns a completely new array

Array.prototype.proxyFilter = function (cb) {
	// as map returns a new array so
	let temp = []
	for (let i = 0; i < this.length; i++) {
		if(cb(this[i], i, this)) {
			temp.push(this[i])
		}
	}
	return temp
}

const proxyOutPut = inputArray.proxyFilter((elem, i, arr) => {
	return elem % 2 === 0
})

console.log("proxyOutPut", proxyOutPut)