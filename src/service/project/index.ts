import { ProjectRepository } from "../../API/repositories/ProjectRepository";

export const findProjects = async(projectRepository: ProjectRepository) => {
  if (!projectRepository){
    throw new Error("No parameters");
  }

  const projects = await projectRepository.findAll();
  if (projects.length === 0){
    throw new Error("No projects on database, please create one before trying to find.");
  }
  return projects;
};

export const findProject = async(projectId: number, projectRepository: ProjectRepository) =>{
  if (!projectId){
    throw new Error("No parameters");
  }

  const project = await projectRepository.findByPk(projectId);

  if (!project){
    throw new Error("Project not found!");
  }
  return project;
}; 

export const createProject = async(projectToCreate: any, projectRepository: ProjectRepository) => {
  if (await projectRepository.projectExists(projectToCreate)){
    throw new Error("The project already exists.");
  }

  const project = await projectRepository.create(projectToCreate);
  return project;
};

export const deleteProject = async(projectId: number, projectRepository: ProjectRepository) => {
  if (!projectId){
    throw new Error("No parameters");
  }
  await projectRepository.destroy(projectId);
};

export const updateProject = async(projectId: any, projectToUpdate: any, projectRepository: ProjectRepository) => {

  const allowedUpdates = ["name", "description", "id_owner", "status"];
  const isValid_projectOperation = Object.keys(projectToUpdate).every((update) => allowedUpdates.includes(update));

  if (!isValid_projectOperation){
    throw new Error("Invalid updates!");
  }

  await projectRepository.update(projectId, projectToUpdate);
};

export const findProjectsByOwner = async(ownerId: number, projectRepository: ProjectRepository) => { 

  const projects = await projectRepository.findByOwner(ownerId);
  return projects;
};

export const findProjectsByStatus = async(status: string, projectRepository: ProjectRepository) => {
  if (!status){
    throw new Error("No parameters");
  }

  const validStatus = ["active", "inactive"];
  const isValidStatus = validStatus.includes(status);

  if (!isValidStatus){
    throw new Error("Invalid status!");
  }

  const projects = await projectRepository.findByStatus(status);

  return projects;
};

export const findProjectByName = async(name: string, projectRepository: ProjectRepository) => {
  if (!name){
    throw new Error("No parameters");
  }

  const project = await projectRepository.projectByName(name);

  return project;
};