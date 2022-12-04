import { ProjectRepository } from "../../API/repositories/ProjectRepository";

class ProjectRepositoryMock implements ProjectRepository {

    public async findAll(): any {
        return Project.findAll();
    }

    public async findByPk(id_project: number): any {
        return null;
    }

    public async create(projectToCreate: any): any {
        return null;
    }

    public async destroy(id_project: number): any {
        return null;
    }

    public async update(id_project: number, projectToUpdate: any): any {
        return null;
    }

    public async findByOwner(id_owner: number): any {
        return null;
    }

    public async findByStatus(status: string): any {
        return null;
    }

    public async projectExists(projectToCreate: any): any {
        return false;
    }

    public async projectByName(name: string): any {
        return null;
    }
}

const project = {
    name: "test"
}