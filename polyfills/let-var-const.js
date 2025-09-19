/*
 NOTE: let and const is kept in temporal dead zone
 before value assignment so it breaks
*/

// var is function scoped
// let const are block scoped

// creation phase and execution phase


{
 var b = 0
}
console.log(b) // works



// variable shadowing
// let variable can't be shadowed by var

function test() {
  let a = "Hello";

	if (true) {
		let a = "Hi";
		console.log(a)
	}

	console.log(a)

}
test()

// can't redeclare let and const in same scope

// reinitialisation

var a = 9
a = 10

let b = 9
b = 10