export class Violation {
  Team: string;
  Level: string;
  Limit: number;
  Actual: number;

  constructor(team: string, level: string, limit: number, actual: number) {
    this.Team = team;
    this.Level = level;
    this.Limit = limit;
    this.Actual = actual;
  }
}
