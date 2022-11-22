import { Router } from "express";
import { getProjects, getProject, postProject, deleteProject, changeProject } from "../../controllers/project";

export const projectRouter = Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProject);
projectRouter.post("/", postProject);
projectRouter.delete("/:id", deleteProject);
projectRouter.patch("/:id", changeProject);