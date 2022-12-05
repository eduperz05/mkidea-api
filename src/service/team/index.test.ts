import { createTeam } from ".";
import { TeamRepository } from "../../API/repositories/TeamRepository";

class TeamRepositoryMock implements TeamRepository {

  public findAll(): any {
    return null;
  }

  public findByPk(): any {
    return null;
  }

  public findByIdProject(): any {
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


describe("createTeam", () => {
  it("Should return user already on team", async() => {
    const teamRepository: any = {};
    teamRepository.isUserOnTeam = async() => true;
    await expect(createTeam({}, teamRepository)).rejects.toThrowError("User already on team");
  });
  it("Should call create if user is not already on the team.", async() => {
    const teamRepository: any = {};
    teamRepository.isUserOnTeam = async() => false;
    teamRepository.create = jest.fn();
    await createTeam({}, teamRepository);
    expect(teamRepository.create).toBeCalled();
  });
});