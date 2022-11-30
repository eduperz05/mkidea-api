
export const findUsers = async(teamRepository: any) => {
  if (!teamRepository) {
    throw new Error("No parameters");
  }
  const users = await teamRepository.findAll();
  if (users.length === 0) {
    throw new Error("No users on database, please create one before trying to find.");
  }
  return users;
};

export const findUser = async(userId: any, teamRepository: any) => {
  if (!userId || !teamRepository) {
    throw new Error("No parameters");
  }

  const user = await teamRepository.findByPk(parseInt(userId.id_user));
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

// Los parametros no se ajustan al modelo
// No hay parametros
// El usuario ya existe
export const createUser = async(userToCreate: any, UserRepository: any) => {
  if (!userToCreate || !UserRepository) {
    throw new Error("No parameters");
  }
  if (!userToCreate.username || 
    !userToCreate.email || 
    !userToCreate.password || 
    !userToCreate.role) {
    throw new Error("A obligatory parameter is missing.");
  }
  if (await UserRepository.usernameExists(userToCreate)) {
    throw new Error("The username already exists.");
  }
  if (await UserRepository.emailExists(userToCreate)) {
    throw new Error("The email already exists.");
  }
  const user = await UserRepository.create(userToCreate);
  return user;
};

export const deleteUser = async(userId: any, teamRepository: any) => {
  if (!userId || !teamRepository) {
    throw new Error("No parameters");
  }
  await teamRepository.destroy(userId);
}; 

export const updateUser = async(userId: any, userToUpdate: any, teamRepository: any) => {
  if (!userId || !userToUpdate || !teamRepository) {
    throw new Error("No parameters");
  }
  const allowedUpdates = ["username", "firstname", "lastname", "email", "password", "role"];
  const isValid_userOperation = Object.keys(userToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_userOperation) {
    throw new Error("Invalid update parameters.");
  }
  await teamRepository.update(parseInt(userId.id_user), userToUpdate);
};