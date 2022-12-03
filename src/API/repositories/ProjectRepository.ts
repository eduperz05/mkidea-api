import { Project } from "../models/project";

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findByPk(id: number): Promise<Project|null>;
  create(project: any): Promise<Project>;
  destroy(id: number): Promise<void>;
  update(id: number, project: any): Promise<Project|null>;
  findByOwner(id: number): Promise<Project[]|null>;
  findByStatus(status: string): Promise<Project[]>;
  projectExists(id: number): Promise<boolean>;
  projectByName(name: string): Promise<Project|null>;
}

export class ProjectRepositorySequelize implements ProjectRepository {

  public async findAll(): Promise<Project[]> {
    return Project.findAll();
  }

  public async findByPk(id_project: number): Promise<Project|null> {
    return Project.findByPk(id_project);
  }

  public async create(projectToCreate: any): Promise<Project> {
    return Project.create(projectToCreate);
  }

  public async destroy(id_project: number): Promise<void> {
    Project.destroy({ where: { id_project } });
  }

  public async update(id_project: number, projectToUpdate: any): Promise<Project|null> {
    await Project.update({ ...projectToUpdate }, { where: { id_project } });
    return Project.findByPk(id_project);
  }

  public async findByOwner(id_owner: number): Promise<Project[] | null> {
    return Project.findAll({ where: { id_owner: id_owner } });
  }

  public async findByStatus(status: string): Promise<Project[]> {
    return Project.findAll({ where: { status: status } });
  }

  public async projectExists(projectToCreate: any): Promise<boolean> {
    const name = projectToCreate.name;
    const sameName = await Project.findAll({ where: { name: name } });
    if (sameName.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public async projectByName(name: string): Promise<Project | null> {
    return Project.findOne({ where: { name: name } });
  }
}