import { Violation } from "./models/violation";
import { ScrapeResponse } from "./types/scrapeResponse";

export class ViolationChecker {
  private scrapeResponse: ScrapeResponse;
  public violationArray: Violation[] = [];

  constructor(scrapeResponse: ScrapeResponse) {
    this.scrapeResponse = scrapeResponse;
  }

  check = () => {
    let limits = this.scrapeResponse.rosterLimits;

    this.scrapeResponse.teamData.forEach((x) => {
      if (x.AAA > limits.AAA) {
        this.addViolation(x.Team, "AAA", limits.AAA, x.AAA);
      }

      if (x.AA > limits.AA) {
        this.addViolation(x.Team, "AA", limits.AA, x.AA);
      }

      if (x.Aplus > limits.Aplus) {
        this.addViolation(x.Team, "A+", limits.Aplus, x.Aplus);
      }

      if (x.A > limits.A) {
        this.addViolation(x.Team, "A", limits.A, x.A);
      }

      if (x.Aminus > limits.Aminus) {
        this.addViolation(x.Team, "A-", limits.Aminus, x.Aminus);
      }

      const rookieLimit: number = x.RookieLeagues * 35;

      if (x.Rookie > rookieLimit) {
        this.addViolation(x.Team, "R", rookieLimit, x.Rookie);
      }
    });

    return this.violationArray;
  };

  addViolation = (
    team: string,
    level: string,
    limit: number,
    actual: number
  ) => {
    this.violationArray.push(new Violation(team, level, limit, actual));
  };
}
