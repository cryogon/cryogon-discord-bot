import fs from "node:fs"

    const rd = fs.readFileSync("./score.json","utf-8");
    const data = (JSON.parse(rd));
    console.log(data.user);
