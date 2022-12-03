import { Router } from "express";
import { getProjectsController, getProjectController, postProjectController, deleteProjectController, updateProjectController, getProjectsByOwnerController, getProjectByNameController, getProjectsByStatusController } from "../../controllers/project";

export const projectRouter = Router();

projectRouter.get("/", getProjectsController); // bien
projectRouter.get("/:id_project", getProjectController); // bien
projectRouter.get("/owner/:id_owner", getProjectsByOwnerController); // bien
projectRouter.get("/name/:name", getProjectByNameController); // null ?
projectRouter.get("/status/:status", getProjectsByStatusController); // bien
projectRouter.post("/", postProjectController); // bien
projectRouter.delete("/:id_project", deleteProjectController); // bien
projectRouter.patch("/:id_project", updateProjectController); // bad request