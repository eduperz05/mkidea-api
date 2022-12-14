import { Request, Response } from "express";
import { ProjectRepositorySequelize } from "../../repositories/ProjectRepository";
import { findProjectsByStatus, findProjects, findProject, createProject, deleteProject, updateProject, findProjectsByOwner, findProjectByName, checkUserOnProject } from "../../../service/project";
import { TeamRepositorySequelize } from "../../repositories/TeamRepository";

export const getProjectsController = async(req: Request, res: Response) => {
  try {
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjects(projectRepository, false);
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }

  return;
};

export const getProjectController = async(req: any, res: any) => {
  try {
    if (!req.params.id_project){
      res.status(400).json("No id_project parameter");
    }
    const { id_project } = req.params;
    const { id_user } = req.id_user;
    const projectRepository = new ProjectRepositorySequelize();
    const teamRepository = new TeamRepositorySequelize();
    const isOnProject = await checkUserOnProject(teamRepository, projectRepository, parseInt(id_project), parseInt(id_user));
    if (!isOnProject) {
      res.status(401).json("User not in project");
      return;
    }
    const project = await findProject(parseInt(id_project), projectRepository, false);
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getProjectsPublicController = async(req: Request, res: Response) => {
  try {
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjects(projectRepository, true);
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }

  return;
};

export const getProjectPublicController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_project){
      res.status(400).json("No id_project parameter");
    }
    const { id_project } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const project = await findProject(parseInt(id_project), projectRepository, true);
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json(err);
  }

  return;
};

export const postProjectController = async(req: Request, res: Response) => {
  try {
    if (!req.body.name ||
      !req.body.description ||
      !req.body.status ||
      !req.body.id_owner) {
      res.status(400).json("A obligatory parameter is missing on body.");
    }
    const projectRepository = new ProjectRepositorySequelize();
    const project = await createProject(req.body, projectRepository);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json(err);
  }

  return;
};

export const deleteProjectController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_project) {
      res.status(400).json("No id_project parameter");
    }
    
    const { id_project } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const deletedProject = await findProject(parseInt(id_project), projectRepository, false);
    await deleteProject(parseInt(id_project), projectRepository);
    res.status(200).json({ deletedProject });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const updateProjectController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_project) {
      res.status(400).json("No id_project parameter");
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
    }
    
    const { id_project } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    await updateProject(parseInt(id_project), req.body, projectRepository);
    const updatedProject = await findProject(parseInt(id_project), projectRepository, false);
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getProjectsByStatusController = async(req: Request, res: Response) => {
  try {
    if (!req.params.status) {
      res.status(400).json("No status parameter");
    }
    
    const { status } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjectsByStatus(status, projectRepository);

    if (projects.length === 0) {
      res.status(404).json({ message: "No projects found" });
      return;
    }
    
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getProjectsByOwnerController = async(req: Request, res: Response) => {
  
  try {
    if (!req.params.id_owner) {
      res.status(400).json("No owner parameter");
    }
    
    const { id_owner } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjectsByOwner(parseInt(id_owner), projectRepository);
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getProjectByNameController = async(req: Request, res: Response) => {
  try {
    if (!req.params.name) {
      res.status(400).json("No name parameter");
    }

    const { name } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const project = await findProjectByName(name, projectRepository);
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};