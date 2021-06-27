// @ts-check

const { log } = console;

const fs = require("fs");

const rs = fs.createReadStream("local/big-file", {
  encoding: "utf-8",
  highWaterMark: 65536 * 2,
});

/** @type {Object<string,number>} */
let numBlocksPerCharacter = {
  a: 0,
  b: 0,
};

/** @type {string | undefined} */
let prevCharacter;
rs.on("data", (data) => {
  if (typeof data !== "string") {
    return;
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== prevCharacter) {
      const newCharacter = data[i];

      if (!newCharacter) {
        continue;
      }

      prevCharacter = newCharacter;
      numBlocksPerCharacter[newCharacter]++;
    }
  }
});

rs.on("end", () => {
  log("event: end");
  log("blockCount", numBlocksPerCharacter);
});
