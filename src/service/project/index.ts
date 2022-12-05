import { ProjectRepository } from "../../API/repositories/ProjectRepository";
import { filterModel } from "../../utils/filterModels";
import { filterFieldsProject } from "../../config/filterFields";

export const findProjects = async(projectRepository: ProjectRepository, filter: boolean) => {
  const projects = await projectRepository.findAll();
  if (projects.length === 0){
    throw new Error("No projects on database, please create one before trying to find.");
  }
  let projectsJsoned = projects.map((project) => project.toJSON());
  if (filter) {
    projectsJsoned = projectsJsoned.map((project) => project = filterModel(project, filterFieldsProject));
  }
  return projectsJsoned;
};

export const findProject = async(projectId: number, projectRepository: ProjectRepository, filter: boolean) =>{
  const project = await projectRepository.findByPk(projectId);
  if (!project){
    throw new Error("Project not found!");
  }
  let projectJsoned = project.toJSON();
  if (filter) {
    projectJsoned = filterModel(projectJsoned, filterFieldsProject);
  }
  return projectJsoned;
}; 

export const createProject = async(projectToCreate: any, projectRepository: ProjectRepository) => {
  if (await projectRepository.projectExists(projectToCreate)){
    throw new Error("Project already exists.");
  }

  const project = await projectRepository.create(projectToCreate);
  return project;
};

export const deleteProject = async(projectId: number, projectRepository: ProjectRepository) => {
  const project = await projectRepository.findByPk(projectId);
  if (!project){
    throw new Error("Project not found!");
  }
  await projectRepository.destroy(projectId);
};

export const updateProject = async(projectId: any, projectToUpdate: any, projectRepository: ProjectRepository) => {
  const project = await projectRepository.findByPk(projectId);
  if (!project){
    throw new Error("Project not found!");
  }
  const allowedUpdates = ["name", "description", "id_owner", "status"];
  const isValid_projectOperation = Object.keys(projectToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_projectOperation){
    throw new Error("Invalid parameters.");
  }
  await projectRepository.update(projectId, projectToUpdate);
};

export const findProjectsByOwner = async(ownerId: number, projectRepository: ProjectRepository) => { 
  const projects = await projectRepository.findByOwner(ownerId);
  if (projects.length){
    throw new Error("No projects found for this owner.");
  }
  return projects;
};

export const findProjectsByStatus = async(status: string, projectRepository: ProjectRepository) => {
  const validStatus = ["active", "inactive"];
  const isValidStatus = validStatus.includes(status);
  if (!isValidStatus){
    throw new Error("Invalid status!");
  }
  const projects = await projectRepository.findByStatus(status);
  return projects;
};

export const findProjectByName = async(name: string, projectRepository: ProjectRepository) => {
  const project = await projectRepository.projectByName(name);
  return project;
};