import { Router } from "express";
import { getTeamsController,  
  getTeamController, 
  getTeamsPublicController,  
  getTeamPublicController, 
  getTeamByProjectController,
  postTeamController,
  deleteTeamController, 
  changeTeamController } from "../../controllers/team";

export const teamRouter = Router();

teamRouter.get("/", getTeamsController);
teamRouter.get("/public", getTeamsPublicController);
teamRouter.get("/:id_team", getTeamController);
teamRouter.get("/public/:id_team", getTeamPublicController);
teamRouter.get("/projectId/:id_project", getTeamByProjectController);
teamRouter.post("/", postTeamController);
teamRouter.delete("/:id_team", deleteTeamController);
teamRouter.patch("/:id_team", changeTeamController);