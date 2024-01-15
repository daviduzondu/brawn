#! /usr/bin/env node

import { program } from "commander";
import { init } from "./index.js";
import clipboard from "clipboardy";

program
  .option("-c", "this optional flag tells Yak to add the results to your clipboard.")
  .option("--link <link>", "The link you want to parse.");

program.parse();

const options = program.opts();
const { c, link } = options;
console.log(`Parsing: ${link}`);

let response = await init(link);
console.log(response);
if (response) {
  if (c) {
    clipboard.writeSync(response);
  }
}
