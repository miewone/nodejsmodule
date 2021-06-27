// @ts-check

const { log } = console;
const fs = require("fs");

const rs = fs.createReadStream("local/jsons");

rs.on("data", (data) => {
  log("event : data");

  if (typeof data !== "string") {
    return;
  }
});

rs.on("end", () => {
  log("event : end");
});
