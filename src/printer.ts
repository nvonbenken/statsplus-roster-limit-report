import { Violation } from "./models/violation";

export class Printer {
  print = (violations: Violation[]) => {
    console.log(
      "THE FOLLOWING TEAMS ARE IN VIOLATION OF THE OBL MINOR LEAGUE ROSTER LIMITS:"
    );

    const groupedViolations: object = this.groupBy(
      violations,
      (x: Violation) => x.Team
    );

    Object.entries(groupedViolations).forEach(([key, value]) => {
      console.log(key);
      value.forEach((x: Violation) => {
        console.log(` - ${x.Level} - Over by ${x.Actual - x.Limit}`);
      });
    });
  };

  groupBy = (sourceArray: any[], iteratee: any) => {
    return sourceArray.reduce(
      (
        accumulator,
        currentValue,
        index,
        array,
        key = iteratee(currentValue)
      ) => (
        (accumulator[key] || (accumulator[key] = [])).push(currentValue),
        accumulator
      ),
      {}
    );
  };
}
