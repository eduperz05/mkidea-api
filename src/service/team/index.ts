
export const findTeams = async(teamRepository: any) => {
  if (!teamRepository) {
    throw new Error("No parameters");
  }
  const teams = await teamRepository.findAll();
  if (teams.length === 0) {
    throw new Error("No teams on database, please create one before trying to find.");
  }
  return teams;
};

export const findTeam = async(teamId: any, teamRepository: any) => {
  if (!teamId || !teamRepository) {
    throw new Error("No parameters");
  }
  const team = await teamRepository.findByPk(parseInt(teamId));
  if (!team) {
    throw new Error("Team not found!");
  }
  return team;
};

export const findTeamByProject = async(projectId: any, teamRepository: any) => {
  if (!projectId || !teamRepository) {
    throw new Error("No parameters");
  }
  const teams = await teamRepository.findByValue(parseInt(projectId));
  if (teams.length === 0) {
    throw new Error("No users on this team.");
  }
  return teams;
};

export const createTeam = async(teamToCreate: any, teamRepository: any) => {
  if (!teamToCreate || !teamRepository) {
    throw new Error("No parameters");
  }
  if (!teamToCreate.id_project ||
    !teamToCreate.id_user ||
    !teamToCreate.role) {
    throw new Error("A obligatory parameter is missing on body.");
  }
  if (await teamRepository.isUserOnTeam(teamToCreate)) {
    throw new Error("User already on team");
  }
  const team = await teamRepository.create(teamToCreate);
  return team;

};

export const deleteTeam = async(teamId: any, teamRepository: any) => {
  if (!teamId || !teamRepository) {
    throw new Error("No parameters");
  }
  await teamRepository.destroy(teamId);
}; 

export const updateUserOnTeam = async(teamId: any, teamToUpdate: any, teamRepository: any) => {
  if (!teamId || !teamToUpdate || !teamRepository) {
    throw new Error("No parameters");
  }
  const allowedUpdates = ["role"];
  const isValid_teamOperation = Object.keys(teamToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_teamOperation) {
    throw new Error("Invalid update parameters.");
  }
  await teamRepository.update(parseInt(teamId), teamToUpdate);
};