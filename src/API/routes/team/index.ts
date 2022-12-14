import { Router } from "express";
import { getTeamsController, getTeamController, getTeamByProjectController, postTeamController, deleteTeamController, changeTeamController } from "../../controllers/team";

export const teamRouter = Router();

teamRouter.get("/", getTeamsController);
teamRouter.get("/:id_team", getTeamController);
teamRouter.get("/projectId/:id_project", getTeamByProjectController);
teamRouter.post("/", postTeamController);
teamRouter.delete("/:id_team", deleteTeamController);
teamRouter.patch("/:id_team", changeTeamController);