import { Router } from "express";
import { getProjects, getProject, postProject, deleteProject, changeProject } from "../../controllers/project";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:id_project", getProject);
projectRouter.post("/", postProject);
projectRouter.delete("/:id_project", deleteProject);
projectRouter.patch("/:id_project", changeProject);