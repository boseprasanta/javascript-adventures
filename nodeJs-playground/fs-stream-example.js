
const fs = require("node:fs");

const readableStream = fs.createReadStream("./txt-files/file1.txt", {
	encoding: "utf-8",
	highWaterMark: 2, // strem has buffer size of 64 bytes by default
})

const writeableStream = fs.createWriteStream("./txt-files/file2.txt")

readableStream.on("data", (chunk) => {
	console.log("chunk", chunk);
	writeableStream.write(chunk)
})