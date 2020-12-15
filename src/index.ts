import { Printer } from "./printer";
import { Scraper } from "./scraper";
import { ViolationChecker } from "./violationChecker";

async function run() {
  let scraper = new Scraper("https://statsplus.net/oblootp/");

  let scrapeResults = await scraper.scrape();

  let violations = new ViolationChecker(scrapeResults).check();

  new Printer().print(violations);
}

run();
