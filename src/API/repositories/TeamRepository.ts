import { Team } from "../models/team";

export interface TeamRepository {
  findAll(): Promise<Team[]>;
  findByPk(id: number): Promise<Team|null>;
  findByIdProject(value: number): Promise<Team[]|null>;
  create(team: any): Promise<Team>;
  destroy(id: number): Promise<void>;
  update(id: number, team: any): Promise<Team|null>;
  isUserOnTeam(team: any): Promise<boolean>;
}

export class TeamRepositorySequelize implements TeamRepository {

  public async findAll(): Promise<Team[]> {
    return Team.findAll();
  }

  public async findByPk(id_team: number): Promise<Team|null> {
    return Team.findByPk(id_team);
  }
  
  public async findByIdProject(value: number): Promise<Team[]|null> {
    return Team.findAll({ where: { id_project: value } });
  }

  public async create(teamToCreate: any): Promise<Team> {
    return Team.create(teamToCreate);
  }

  public async destroy(id_team: number): Promise<void> {
    Team.destroy({ where: { id_team } });
  }

  public async update(id_team: number, teamToUpdate: any): Promise<Team|null> {
    await Team.update({ ...teamToUpdate }, { where: { id_team } });
    return Team.findByPk(id_team);
  }

  public async isUserOnTeam(teamToCreate: any): Promise<boolean> {
    const idProj = teamToCreate.id_project;
    const sameTeam = await Team.findAll({ where: { id_project: idProj } });
    const userOnTeam = sameTeam.filter((userTeam: any) => userTeam.id_users === teamToCreate.id_users);
    if (userOnTeam.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}