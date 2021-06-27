// @ts-check

const { log, error } = console;

const fs = require("fs");
const stream = require("stream");
const zlib = require("zlib");
const util = require("util");

async function gzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream("local/big-file"),
    zlib.createGzip(),
    fs.createWriteStream("local/big-file.gz")
  );
}

async function gunzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream("local/big-file.gz"),
    zlib.createGzip(),
    fs.createWriteStream("local/big-file.unzipped")
  );
}

async function main() {
  await gzip();
  await gunzip();
}

main();
// (err) => {
//     if (err) error(`Pipeline failed.`, err);
//     else {
//       log(`Pipeline succeeded.`);
//       stream.pipeline(
//         fs.createReadStream("local/big-file.gz"),
//         zlib.createGunzip(),
//         fs.createWriteStream("local/big-file.unzipped"),
//         (_err) => {
//           if (_err) {
//             error(`Gunzip filed.`, _err);
//           } else log(`Gunzip succedded`);
//         }
//       );
//     }
//   }
