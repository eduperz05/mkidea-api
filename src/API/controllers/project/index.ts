import { AuthRequest, AuthResponse } from "../../../types/Auth";
import { ProjectRepositorySequelize } from "../../repositories/ProjectRepository";
import { TeamRepositorySequelize } from "../../repositories/TeamRepository";
import { RoleHelperBinary } from "../../../utils/roleHelper";
import { findProjectsByStatus, findProjects, findProject, createProject, deleteProject, updateProject, findProjectsByOwner, findProjectByName, checkUserOnProject, checkOwnerOfProject } from "../../../service/project";

export const getProjectsController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjects(projectRepository, false);
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(400).json(err.message);
  }

  return;
};

export const getProjectController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_project){
      res.status(400).json("No id_project parameter");
      return;
    }
    const { id_project } = req.params;
    const { id_user, id_role: role_user } = req.user;
    const projectRepository = new ProjectRepositorySequelize();
    const teamRepository = new TeamRepositorySequelize();
    const roleHelper = new RoleHelperBinary();
    const isOnProject = await checkUserOnProject(teamRepository, projectRepository, parseInt(id_project), parseInt(id_user));
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, parseInt(id_project), id_user);
    if (!roleHelper.isAdmin(role_user) || !isOnProject || !isOwnerOfProject) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    const project = await findProject(parseInt(id_project), projectRepository, false);
    res.status(200).json(project);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getProjectsPublicController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjects(projectRepository, true);
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(400).json(err.message);
  }

  return;
};

export const getProjectPublicController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_project){
      res.status(400).json("No id_project parameter");
      return;
    }
    const { id_project } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const project = await findProject(parseInt(id_project), projectRepository, true);
    res.status(200).json(project);
  } catch (err: any) {
    res.status(400).json(err.message);
  }

  return;
};

export const postProjectController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.body.name ||
      !req.body.description ||
      !req.body.status) {
      res.status(400).json("A obligatory parameter is missing on body.");
      return;
    }
    req.body.id_owner = req.user.userId;
    const { role: role_user_request } = req.user;
    const roleHelper = new RoleHelperBinary();
    if (!roleHelper.isOwner(role_user_request)) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    const projectRepository = new ProjectRepositorySequelize();
    const project = await createProject(req.body, projectRepository);
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json(err.message);
  }

  return;
};

export const deleteProjectController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_project) {
      res.status(400).json("No id_project parameter");
      return;
    }
    const { id_project } = req.params;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const projectRepository = new ProjectRepositorySequelize();
    const teamRepository = new TeamRepositorySequelize();
    const roleHelper = new RoleHelperBinary();
    const isOnProject = await checkUserOnProject(teamRepository, projectRepository, parseInt(id_project), parseInt(id_user_request));
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, parseInt(id_project), id_user_request);
    if (!roleHelper.isAdmin(role_user_request) || !isOnProject || !isOwnerOfProject) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    const deletedProject = await findProject(parseInt(id_project), projectRepository, false);
    await deleteProject(parseInt(id_project), projectRepository);
    res.status(200).json({ deletedProject });
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const updateProjectController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_project) {
      res.status(400).json("No id_project parameter");
      return;
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
      return;
    }
    const { id_project } = req.params;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const projectRepository = new ProjectRepositorySequelize();
    const teamRepository = new TeamRepositorySequelize();
    const roleHelper = new RoleHelperBinary();
    const isOnProject = await checkUserOnProject(teamRepository, projectRepository, parseInt(id_project), parseInt(id_user_request));
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, parseInt(id_project), id_user_request);
    if (!roleHelper.isAdmin(role_user_request) || !isOnProject || !isOwnerOfProject) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    await updateProject(parseInt(id_project), req.body, projectRepository);
    const updatedProject = await findProject(parseInt(id_project), projectRepository, false);
    res.status(200).json(updatedProject);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getProjectsByStatusController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.status) {
      res.status(400).json("No status parameter");
      return;
    }
    
    const { status } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjectsByStatus(status, projectRepository);

    if (projects.length === 0) {
      res.status(404).json({ message: "No projects found" });
      return;
    }
    
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getProjectsByOwnerController = async(req: AuthRequest, res: AuthResponse) => {
  
  try {
    if (!req.params.id_owner) {
      res.status(400).json("No owner parameter");
      return;
    }
    let { id_owner } = req.params;
    if (id_owner === "me") {
      id_owner = req.user.userId;
    }
    const projectRepository = new ProjectRepositorySequelize();
    const projects = await findProjectsByOwner(parseInt(id_owner), projectRepository);
    res.status(200).json(projects);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getProjectByNameController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.name) {
      res.status(400).json("No name parameter");
      return;
    }

    const { name } = req.params;
    const projectRepository = new ProjectRepositorySequelize();
    const project = await findProjectByName(name, projectRepository);
    res.status(200).json(project);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};