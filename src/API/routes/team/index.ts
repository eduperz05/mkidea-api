import { Router } from "express";
import { getTeams, getTeam, postTeam, deleteTeam, changeTeam } from "../../controllers/team";

export const teamRouter = Router();

teamRouter.get("/", getTeams);
teamRouter.get("/:id", getTeam);
teamRouter.post("/:id", postTeam);
teamRouter.delete("/:id", deleteTeam);
teamRouter.patch("/:id", changeTeam);