const fs = require("node:fs");

// const fileContents = fs.readFileSync("./file.txt", "utf-8"); // returns buffer
console.log("fileContents")

fs.readFile("./file.txt", "utf-8", (error, data) => { // non blocking
	debugger;
	if (error) {
		console.log("error", error)
	} else {
		console.log("data", data)
	}
})

fs.writeFileSync("./greet.txt", "Hello World!");

fs.writeFile(
	"./greet.txt", // file path
	"Hello Vishwa!", // input
	{ flag: "a" }, // append mode
	(error) => {
		if (error) {
			console.log(error)
		} else {
			console.log("File written")
		}
});


// to read the content of a file