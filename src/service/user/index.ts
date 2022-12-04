import { UserRepository } from "../../API/repositories/UserRepository";

export const findUsers = async(userRepository: UserRepository) => {
  const users = await userRepository.findAll();
  if (users.length === 0) {
    throw new Error("No users on database, please create one before trying to find.");
  }
  return users;
};

export const findUser = async(userId: number, userRepository: UserRepository) => {
  const user = await userRepository.findByPk(userId);
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
};

export const findUserByUsername = async(username: string, userRepository: UserRepository) => {
  const user = await userRepository.findByUser(username);
  if (!user) {
    throw new Error("User not found!");
  }
  return user; 
};

export const findUserByEmail = async(email: string, userRepository: UserRepository) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("User not found!");
  }
  return user; 
};

export const createUser = async(userToCreate: any, UserRepository: UserRepository) => {
  if (await UserRepository.usernameExists(userToCreate)) {
    throw new Error("The username already exists.");
  }
  if (await UserRepository.emailExists(userToCreate)) {
    throw new Error("The email already exists.");
  }
  const user = await UserRepository.create(userToCreate);
  return user;
};

export const deleteUser = async(userId: number, userRepository: UserRepository) => {
  await userRepository.destroy(userId);
}; 

export const updateUser = async(userId: number, userToUpdate: any, userRepository: UserRepository) => {
  const allowedUpdates = ["username", "firstname", "lastname", "email", "password", "role"];
  const isValid_userOperation = Object.keys(userToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_userOperation) {
    throw new Error("Invalid update parameters.");
  }
  await userRepository.update(userId, userToUpdate);
};