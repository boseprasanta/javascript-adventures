
const fs = require("node:fs");
const zlib = require("node:zlib")

const gzip = zlib.createGzip() // this creates a transaform stream

const readableStream = fs.createReadStream("./txt-files/file1.txt", {
	encoding: "utf-8",
	highWaterMark: 2
})

const writeableStream = fs.createWriteStream("./txt-files/file2.txt.gz")

readableStream.pipe(gzip).pipe(writeableStream)
