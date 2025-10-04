const fs = require("node:fs");
const zlib = require("node:zlib");

// Create a transform stream for decompression
const gunzip = zlib.createGunzip();

const readableStream = fs.createReadStream("./txt-files/file2.txt.gz");
const writeableStream = fs.createWriteStream("./txt-files/file2-unzipped.txt");

// Pipe compressed file through gunzip into writable stream
readableStream.pipe(gunzip).pipe(writeableStream); // pipe returns destination stream
