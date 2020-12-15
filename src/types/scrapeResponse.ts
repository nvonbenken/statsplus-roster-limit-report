import { RosterLimits } from "../models/rosterLimits";
import { TeamData } from "../models/teamData";

export type ScrapeResponse = {
  rosterLimits: RosterLimits;
  teamData: TeamData[];
};
