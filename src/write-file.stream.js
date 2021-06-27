// @ts-check

const fs = require("fs");
const ws = fs.createWriteStream("local/big-file");

const NUM_BLOCK = 500;

/** @type {Object.<string,number>} */
const numBlocksPerCharacter = {
  a: 0,
  b: 0,
};
for (let i = 0; i < NUM_BLOCK; i++) {
  const blockLength = Math.floor(800 + Math.random() * 200);
  const character = i % 2 === 0 ? "a" : "b";
  ws.write(character.repeat(1024 * blockLength));

  numBlocksPerCharacter[character]++;
}

console.log(numBlocksPerCharacter);
