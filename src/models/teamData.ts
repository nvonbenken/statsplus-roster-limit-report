export class TeamData {
  Team: string;
  AAA: number;
  AA: number;
  Aplus: number;
  A: number;
  Aminus: number;
  Rookie: number;
  RookieLeagues: number;

  constructor(array: any[]) {
    this.Team = array[1];
    this.AAA = array[4];
    this.AA = array[5];
    this.Aplus = array[6];
    this.A = array[7];
    this.Aminus = array[8];
    this.Rookie = array.slice(9, 13).reduce((a, b) => a + b, 0);
    this.RookieLeagues = array.slice(9, 13).filter((x) => x > 0).length;
  }
}
