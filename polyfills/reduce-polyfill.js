

const numberList = [5, 1, 3, 6, 7]

Array.prototype.myReduce = function (cb, initialValue) {
  let acc = initialValue

  for (let i = 0; i < this.length; i++) {
		// if initial value isn't set take the first element
    acc = acc ? cb(acc, this[i], i, this) : this[i]
  }
  return acc
}

const sum = numberList.myReduce((acc, cur) => {
	return acc + cur
}, 0)

console.log("sum", sum)