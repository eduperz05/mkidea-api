import { TeamRepository } from "../../API/repositories/TeamRepository";

export const findTeams = async(teamRepository: TeamRepository) => {
  const teams = await teamRepository.findAll();
  if (teams.length === 0) {
    throw new Error("No teams on database, please create one before trying to find.");
  }
  return teams;
};

export const findTeamByPk = async(teamId: number, teamRepository: TeamRepository) => {
  const team = await teamRepository.findByPk(teamId);
  if (!team) {
    throw new Error("TeamId not found!");
  }
  return team;
};

export const findTeamByProject = async(projectId: number, teamRepository: TeamRepository) => {
  const teams = await teamRepository.findByIdProject(projectId);
  if (!teams?.length) {
    throw new Error("No users on this team.");
  }
  return teams;
};

export const createTeam = async(teamToCreate: any, teamRepository: TeamRepository) => {
  if (await teamRepository.isUserOnTeam(teamToCreate)) {
    throw new Error("User already on team");
  }
  const team = await teamRepository.create(teamToCreate);
  return team;

};

export const deleteTeam = async(teamId: number, teamRepository: TeamRepository) => {
  await teamRepository.destroy(teamId);
}; 

export const updateUserOnTeam = async(teamId: number, teamToUpdate: any, teamRepository: any) => {
  const allowedUpdates = ["role"];
  const isValid_teamOperation = Object.keys(teamToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_teamOperation) {
    throw new Error("Invalid update parameters.");
  }
  await teamRepository.update(teamId, teamToUpdate);
};