import { findTeams, findTeamByPk, findTeamByProject, findTeamsByUser, createTeam, deleteTeam, updateUserOnTeam } from ".";
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

const team = {
  id_project: 1,
  id_team: 1,
  id_users: 1,
  toJSON: () => {
    return {
      id_project: 1,
      id_users: 1,
    };
  }
};

describe("findTeams", () => {
  it("Should return an empty array", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findAll = jest.fn().mockReturnValue([]);
    await expect(findTeams(teamRepository, false)).rejects.toThrowError("No teams on database, please create one before trying to find.");
  });

  it("Should return an array of unfiltered teams", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findAll = jest.fn().mockReturnValue([team]);
    await expect(findTeams(teamRepository, false)).resolves.toEqual([team.toJSON()]);
  });

  it("Should return an array of filtered teams", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findAll = jest.fn().mockReturnValue([team]);
    await expect(findTeams(teamRepository, true)).resolves.toEqual([team.toJSON()]);
  });
});

describe("findTeamByPk", () => {
  it("Should return an error if the team_id is not found", async() => {
    const teamRepository = new TeamRepositoryMock();
    await expect(findTeamByPk(1, teamRepository, false)).rejects.toThrowError("Team Id not found.");
  });

  it("Should return a unfiltered team", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByPk = jest.fn().mockReturnValue(team);
    await expect(findTeamByPk(1, teamRepository, false)).resolves.toEqual(team.toJSON());
  });
  
  it("Should return a filtered team", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByPk = jest.fn().mockReturnValue(team);
    await expect(findTeamByPk(1, teamRepository, true)).resolves.toEqual(team.toJSON());
  });
});

describe("findTeamByProject", () => {
  it("Should return an error if the project_id is not found", async() => {
    const teamRepository = new TeamRepositoryMock();
    await expect(findTeamByProject(1, teamRepository)).rejects.toThrowError("No users on this team.");
  });

  it("Should return an array of teams", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByIdProject = jest.fn().mockReturnValue([team]);
    await expect(findTeamByProject(1, teamRepository)).resolves.toEqual([team]);
  });
});

describe("findTeamsByUser", () => {
  it("Should return an error if the user_id is not found", async() => {
    const teamRepository = new TeamRepositoryMock();
    await expect(findTeamsByUser(1, teamRepository)).rejects.toThrowError("No teams for this user.");
  });

  it("Should return an array of teams", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByIdUser = jest.fn().mockReturnValue([team]);
    await expect(findTeamsByUser(1, teamRepository)).resolves.toEqual([team]);
  });
});


describe("createTeam", () => {
  it("Should return user already on team", async() => {
    const teamRepository: any = {};
    teamRepository.isUserOnTeam = async() => true;
    await expect(createTeam({}, teamRepository)).rejects.toThrowError("User already on team.");
  });

  it("Should call create if user is not already on the team.", async() => {
    const teamRepository: any = {};
    teamRepository.isUserOnTeam = async() => false;
    teamRepository.create = jest.fn();
    await createTeam({}, teamRepository);
    expect(teamRepository.create).toBeCalled();
  });
});

describe("deleteTeam", () => {
  it("Should return an error if the team_id is not found", async() => {
    const teamRepository = new TeamRepositoryMock();
    await expect(deleteTeam(1, teamRepository)).rejects.toThrowError("Team Id not found.");
  });
});

describe("updateUserOnTeam", () => {
  it("Should return an error if the team_id is not found", async() => {
    const teamRepository = new TeamRepositoryMock();
    await expect(updateUserOnTeam(1, 1, teamRepository)).rejects.toThrowError("Team Id not found.");
  });

  it("Should return an error if the params are not valid", async() => {
    const teamRepository = new TeamRepositoryMock();
    teamRepository.findByPk = jest.fn().mockReturnValue(team);
    await expect(updateUserOnTeam(1, team, teamRepository)).rejects.toThrowError("Invalid update parameters.");
  });
});
