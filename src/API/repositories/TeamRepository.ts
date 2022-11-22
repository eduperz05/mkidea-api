import { Team } from "../models/team";


export class TeamRepository {

  public async findAll(): Promise<Team[]> {
    return Team.findAll();
  }

  public async findByPk(id_team: number): Promise<Team|null> {
    return Team.findByPk(id_team);
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