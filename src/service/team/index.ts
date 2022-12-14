import { TeamRepository } from "../../API/repositories/TeamRepository";
import { filterModel } from "../../utils/filterModels";
import { filterFieldsTeam } from "../../config/filterFields";
import { allowedUpdatesTeam } from "../../config/allowedUpdates";


export const findTeams = async(teamRepository: TeamRepository, filter: boolean) => {
  const teams = await teamRepository.findAll();
  if (teams.length === 0) {
    throw new Error("No teams on database, please create one before trying to find.");
  }
  let teamsJsoned = teams.map((team) => team.toJSON());
  if (filter) {
    teamsJsoned = teamsJsoned.map((team) => team = filterModel(team, filterFieldsTeam));
  }
  return teamsJsoned;
};

export const findTeamByPk = async(teamId: number, teamRepository: TeamRepository, filter: boolean) => {
  const team = await teamRepository.findByPk(teamId);
  if (!team) {
    throw new Error("Team Id not found.");
  }
  let teamJsoned = team.toJSON();
  if (filter) {
    teamJsoned = filterModel(teamJsoned, filterFieldsTeam);
  }
  return teamJsoned;
};

export const findTeamByProject = async(projectId: number, teamRepository: TeamRepository) => {
  const teams = await teamRepository.findByIdProject(projectId);
  if (!teams?.length) {
    throw new Error("No users on this team.");
  }
  return teams;
};

export const findTeamsByUser = async(userId: number, teamRepository: TeamRepository) => {
  const teams = await teamRepository.findByIdUser(userId);
  if (!teams?.length) {
    throw new Error("No teams for this user.");
  }
  return teams;
};

export const createTeam = async(teamToCreate: any, teamRepository: TeamRepository) => {
  if (await teamRepository.isUserOnTeam(teamToCreate)) {
    throw new Error("User already on team.");
  }
  const team = await teamRepository.create(teamToCreate);
  return team;
};

export const deleteTeam = async(teamId: number, teamRepository: TeamRepository) => {
  const team = await teamRepository.findByPk(teamId);
  if (!team) {
    throw new Error("Team Id not found.");
  }
  await teamRepository.destroy(teamId);
}; 

export const updateUserOnTeam = async(teamId: number, teamToUpdate: any, teamRepository: any) => {
  const team = await teamRepository.findByPk(teamId);
  if (!team) {
    throw new Error("Team Id not found.");
  }
  const allowedUpdates = allowedUpdatesTeam;
  const isValid_teamOperation = Object.keys(teamToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_teamOperation) {
    throw new Error("Invalid update parameters.");
  }
  await teamRepository.update(teamId, teamToUpdate);
};

export const userOnTeam = async(userId: number, projectId: number, teamRepository: TeamRepository) => {
  const team = {
    id_project: projectId,
    id_users: userId
  };
  const isOnTeam = await teamRepository.isUserOnTeam(team);
  if (!isOnTeam) {
    throw new Error("User not on team.");
  }
  return isOnTeam;
};
