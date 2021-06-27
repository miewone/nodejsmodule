// @ts-check

const fs = require("fs");

const ws = fs.createWriteStream("local/big-file");

for (let i = 0; i < 500; i += 1) {
  ws.write("a".repeat(1024 * 1024));
}
