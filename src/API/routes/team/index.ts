import { Router } from "express";
import { getTeamsController, getTeamController, getTeamByProjectController, getTeamByUserController, postTeamController, deleteTeamController, changeTeamController } from "../../controllers/team";
import { authAdmin } from "../../middlewares/auth-admin";
import { authOwner } from "../../middlewares/auth-owner";

export const teamRouter = Router();

teamRouter.get("/", [authAdmin], getTeamsController);
teamRouter.get("/:id_team", getTeamController);
teamRouter.get("/project/:id_project", [authAdmin], getTeamByProjectController);
teamRouter.get("/user/:id_user", getTeamByUserController);
teamRouter.post("/", [authOwner], postTeamController);
teamRouter.delete("/:id_team", [authOwner], deleteTeamController);
teamRouter.patch("/:id_team", [authOwner], changeTeamController);