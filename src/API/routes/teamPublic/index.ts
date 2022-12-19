import { Router } from "express";
import { 
  getTeamsPublicController,  
  getTeamPublicController } from "../../controllers/team";

export const teamRouterPublic = Router();

teamRouterPublic.get("/", getTeamsPublicController);
teamRouterPublic.get("/:id_team", getTeamPublicController);