import fs, { readFileSync } from "node:fs"

fs.writeFileSync("./test.cdb","Bot Bot","base64");

const file = readFileSync("./test.cdb",{
  encoding:"base64",
  flag:"="
});
console.log(file);