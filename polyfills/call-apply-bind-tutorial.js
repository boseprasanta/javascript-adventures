// call -> sets / resets the this of a function

const person1 = {
  first: "Andrew",
	last: "Flintoff",
	getName: function (hometown, pin) {
		console.log(this.first + " " + this.last + ", " + hometown + ", " + pin)
	}
}

const person2 = {
  first: "Ricky",
	last: "Ponting"
}

person1.getName.call(person2, "Madhyamgram", 700129)
person1.getName.apply(person2, ["Madhyamgram", 700129]) // call and apply has just syntax difference


// bind is same as call
// just that it doesn't execute, rather returns an excutable function

const bindFunction = person1.getName.bind(person2, "Madhyamgram-1", 700129)
bindFunction()



/*
	basically with call you share a function from one object to another
	So, in context you send the borrower object assign function to it
	No, the borrower object has the copy of the function
	Now we execute it
*/

console.log("polyFill myCall")

Function.prototype.myCall = function (context = {}, ...args) {
	// if context isn't set globalThis has to be considered
	if (typeof this !== "function") {
		throw new Error(this + "is not callable")
	}

	context.fn = this
	context.fn(...args)
}

person1.getName.myCall(person2, "Sydney", "Aus")


console.log("polyFill apply")

Function.prototype.myApply = function (context = {}, args = []) {
	// if context isn't set globalThis has to be considered
	if (typeof this !== "function") {
		throw new Error(this + "is not callable")
	}

	if (!Array.isArray(args)) {
		throw new Error("CreateListFromArrayLike called on non-object")
	}

	context.fn = this
	context.fn(...args)
}

// polyfill bind
// returns a function

Function.prototype.myBind = function (context = {}, ...args) {
	console.log(typeof context)
	// if (typeof context !== "function") {
	// 	throw new Error(this + "Can't be bound, not callable")
	// }
	context.fn = this
	return function(...internalArgs) {
		return context.fn(...args, ...internalArgs)
	}
}

const polyFillBindOp = person1.getName.myBind(person2)
polyFillBindOp(
	"Kolkata", "700129"
)
