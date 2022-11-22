

export const createTeam = async(teamToCreate: any, teamRepository: any) => {
  try {
    if (await teamRepository.isUserOnTeam(teamToCreate)) {
      throw new Error("User already on team");
    } 
    const team = await teamRepository.create(teamToCreate);
    return team;
  } catch (err) {
    throw err;
  }
};