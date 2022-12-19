import { ProjectRepository } from "../../API/repositories/ProjectRepository";
import { TeamRepository } from "../../API/repositories/TeamRepository";

export class TeamRepositoryMock implements TeamRepository {

  public findAll(): any {
    return null;
  }
  
  public findByPk(): any {
    return null;
  }
  
  public findByIdProject(): any {
    return null;
  }
  
  public findByIdUser(): any {
    return null;
  }
  
  public create(): any {
    return null;
  }
  
  public destroy(): any {
    return;
  }
  
  public update(): any {
    return null;
  }
  
  public isUserOnTeam(): any {
    return false;
  }
}

export class ProjectRepositoryMock implements ProjectRepository {

  public findAll(): any {
    return null;
  }
  
  public findByPk(): any {
    return null;
  }
  
  public create(): any {
    return null;
  }
  
  public destroy(): any {
    return null;
  }
  
  public update(): any {
    return null;
  }
  
  public findByOwner(): any {
    return [];
  }
  
  public findByStatus(): any {
    return [];
  }
  
  public projectExists(): any {
    return false;
  }
  
  public projectByName(): any {
    return null;
  }
}