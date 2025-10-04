import fs from "node:fs/promises"

async function readFile() {
	try {
		const fileData = await fs.readFile("./file.txt", "utf-8")
		console.log("data", fileData)
	} catch (error) {
		console.log(error)
	}
}

await readFile()