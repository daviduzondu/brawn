#! /usr/bin/env node

import { program } from "commander";
import { init } from "./index.js";
import clipboard from "clipboardy";

program
  .option("-c", "this optional flag tells Yak to add the results to your clipboard.")
  .option("--link <link>", "The link you want to parse.")
  .action(async ({ c, link }) => {
    console.log(`Parsing: ${link}`);
    let response = await init(link);
    console.log(response);
    if (response) {
      if (c) {
        clipboard.writeSync(`${response}`);
        console.log("Hi");
      }
    }
  });

program.parse();
