import { UserRepository } from "../../API/repositories/UserRepository";
import { comparePassword } from "../../utils/comparePassword";
import { generateToken } from "../../utils/generateToken";
import { encryptPassword } from "../../utils/encryptPassword";

export const login = async(username: string, password: string, userRepository: UserRepository): Promise<string> => {
  const user = await userRepository.findByUser(username);
  if (user){
    const validPassword = comparePassword(password, user.password);
    if (!validPassword) {
      throw new Error("Incorrect password");
    }
    const token = await generateToken(user.id_user);
    return token;
  }
  throw new Error("User not found");
};

export const register = async(userToCreate: any, userRepository: UserRepository): Promise<string> => {
  if (await userRepository.usernameExists(userToCreate)) {
    throw new Error("The username already exists.");
  }
  if (await userRepository.emailExists(userToCreate)) {
    throw new Error("The email already exists.");
  }
  userToCreate.password = encryptPassword(userToCreate.password);
  const user = await userRepository.create(userToCreate);
  const token = await generateToken(user.id_user);
  return token;
};
