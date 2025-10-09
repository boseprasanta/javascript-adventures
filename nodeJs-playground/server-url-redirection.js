const http = require("node:http")
const fs = require("node:fs")

const server = http.createServer((req, res) => {

	const { method, url } = req

	res.writeHead(200, { "Content-Type": "text/html" })

	// Simple URL redirection logic

	console.log("method", method, "url", url)

	switch (url) {
		case "/":
			res.end('<h1>Hello from Homepage</h1>')
			break;
		case "/about":
			res.end('<h1>Hello from About page</h1>')
			break;
		case "/contact":
			res.end('<h1>Hello from Contact page</h1>')
			break;
		default:
			res.end("<h1>404 Not Found</h1>")
			return
	}
})

server.listen(3000, () => {
	console.log("Server started listening")
})