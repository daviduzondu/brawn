import fs, { fsync } from "fs";
import cheerio from "cheerio";

async function getHTML(link) {
  try {
    const response = await fetch(link);
    const data = await response.text();
    // Error handling
    if (response.status !== 200) {
      throw new Error(`${response.status} Error`);
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function init(link) {
  try {
    const html = await getHTML(link);
    if (html) {
      let $ = cheerio.load(html);
      let articleText = $("article").text();
      if (!articleText) throw new Error("Page could not be parsed.");
      return articleText;
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}
