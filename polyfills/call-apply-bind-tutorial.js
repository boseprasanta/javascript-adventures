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