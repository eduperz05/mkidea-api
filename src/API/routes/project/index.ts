import { Router } from "express";
import { getProjectsController, getProjectController, postProjectController, deleteProjectController, updateProjectController, getProjectsByOwnerController, getProjectByNameController, getProjectsByStatusController } from "../../controllers/project";
import { authAdmin } from "../../middlewares/auth-admin";
import { authOwner } from "../../middlewares/auth-owner";

export const projectRouter = Router();

projectRouter.get("/", [authAdmin], getProjectsController);
projectRouter.get("/:id_project", getProjectController);
projectRouter.get("/owner/:id_owner", [authAdmin],getProjectsByOwnerController);
projectRouter.get("/name/:name", [authAdmin], getProjectByNameController); 
projectRouter.get("/status/:status", [authAdmin], getProjectsByStatusController);
projectRouter.post("/", [authOwner], postProjectController);
projectRouter.delete("/:id_project", [authOwner], deleteProjectController); 
projectRouter.patch("/:id_project", [authOwner], updateProjectController);