import { Router } from "express";
import { getTeams, getTeam, postTeam, deleteTeam, changeTeam } from "../../controllers/team";

export const teamRouter = Router();

teamRouter.get("/", getTeams);
teamRouter.get("/:id_team", getTeam);
teamRouter.post("/", postTeam);
teamRouter.delete("/:id_team", deleteTeam);
teamRouter.patch("/:id_team", changeTeam);