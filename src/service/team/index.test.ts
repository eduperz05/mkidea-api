import { createTeam } from ".";

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