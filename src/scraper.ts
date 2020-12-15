import puppeteer from "puppeteer";
import { RosterLimits } from "./models/rosterLimits";
import { TeamData } from "./models/teamData";
import { ScrapeInfo } from "./types/scrapeInfo";
import { ScrapeResponse } from "./types/scrapeResponse";

export class Scraper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  scrape = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`${this.baseUrl}/roster`);

    await page.setViewport({
      width: 1200,
      height: 1160,
    });

    let name = new Date().toDateString();

    await page.screenshot({
      path: `output/screenshots/${name}.png`,
    });

    const result = await page.evaluate(() => {
      const scrapeInfo: ScrapeInfo = {
        rosterLimitArray: [],
        teamRows: [],
      };

      [].slice
        .call(document.querySelectorAll("th"))
        .slice(3, 13)
        .forEach((el: any) => {
          let limit = parseInt(el.innerText.match(/\d+/)[0]);
          scrapeInfo.rosterLimitArray.push(limit);
        });

      [].slice
        .call(document.querySelectorAll("tbody tr"))
        .forEach((row: any) => {
          let rowArray = row.textContent
            .split("\n")
            .map((x: string) => x.trim())
            .filter((x: string) => x != "");

          let parsedRowArray = rowArray.map((x: string, index: number) => {
            return index > 1 ? parseInt(x) || 0 : x;
          });

          scrapeInfo.teamRows.push(parsedRowArray);
        });

      return scrapeInfo;
    });

    browser.close();

    const scrapeResponse: ScrapeResponse = {
      rosterLimits: new RosterLimits(result.rosterLimitArray),
      teamData: result.teamRows.map((row: any) => new TeamData(row)),
    };

    return scrapeResponse;
  };
}
