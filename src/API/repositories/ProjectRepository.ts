import { Project } from "../models/project";

export class ProjectRepository {

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
}