export class RosterLimits {
  AAA: number;
  AA: number;
  Aplus: number;
  A: number;
  Aminus: number;

  constructor(array: number[]) {
    this.AAA = array[0];
    this.AA = array[1];
    this.Aplus = array[2];
    this.A = array[3];
    this.Aminus = array[4];
  }
}
