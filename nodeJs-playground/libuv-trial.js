const crypto = require("node:crypto")

const os = require('os');
console.log(os.cpus());


const MAX_CALLS = 10

const start = Date.now()

process.env.UV_THREADPOOL_SIZE = 10; // default is 4, max is 128

for (let i = 0; i < MAX_CALLS; i++) {
  crypto.pbkdf2("hey_long_password", "salt", 100000, 512, "sha512", () => { 
		// async function is handed over to libuv thread pool
		// libuv's default thread pool size is 4
		// you can change it by setting env variable UV_THREADPOOL_SIZE
		console.log("Hash generated", i + 1);
		console.log("Time taken:", Date.now() - start);
	})
}
