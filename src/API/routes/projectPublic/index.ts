import { Router } from "express";
import { getProjectsPublicController, getProjectPublicController } from "../../controllers/project";

export const projectRouterPublic = Router();

projectRouterPublic.get("/", getProjectsPublicController);
projectRouterPublic.get("/:id_project", getProjectPublicController);