import { createTeam } from ".";
import { TeamRepository } from "../../API/repositories/TeamRepository";

class TeamRepositoryMock implements TeamRepository {

  public async findAll(): any {
    return null;
  }

  public async findByPk(id_team: number): any {
    return null;
  }

  public async findByIdProject(value: number): any {
    return null;
  }

  public async create(teamToCreate: any): any {
    return teamToCreate;
  }

  public async destroy(id_team: number): any {
    return;
  }

  public async update(id_team: number, teamToUpdate: any): any {
    return null;
  }

  public async isUserOnTeam(teamToCreate: any): any {
    return false;
  }

}

const team = {

}

describe("createTeam", () => {
  it("Should return user already on team", async () => {
    const teamRepository: any = {};
    teamRepository.isUserOnTeam = async () => true;
    await expect(createTeam({}, teamRepository)).rejects.toThrowError("User already on team");
  });
  it("Should call create if user is not already on the team.", async () => {
    const teamRepository: any = {};
    teamRepository.isUserOnTeam = async () => false;
    teamRepository.create = jest.fn();
    await createTeam({}, teamRepository);
    expect(teamRepository.create).toBeCalled();
  });
});