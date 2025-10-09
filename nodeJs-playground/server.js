const http = require("node:http")
const fs = require("node:fs")

const server = http.createServer((req, res) => {
	// with out content type you are letting browser guess what type of content you are serving

	const superHero = {
		firstName: "Bruce",
		lastName: "Wayne"
	}

	// res.writeHead(200, { "Content-Type": "application/json" })
	// res.end(superHero)

	// res.writeHead(200, { "Content-Type": "text/html" })
	// res.end(html)

	fs.createReadStream(__dirname + "/index.html").pipe(res) // res is a writable stream
})

server.listen(3000, () => {
	console.log("Server started listening")
})