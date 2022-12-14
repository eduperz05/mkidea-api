import { UserRepository } from "../../API/repositories/UserRepository";
import { TokenHelper } from "../../utils/tokenHelper";
import { PasswordHelper } from "../../utils/passwordHelper";

export const login = async(username: string, password: string, userRepository: UserRepository, passwordHelper: PasswordHelper, tokenHelper: TokenHelper): Promise<string> => {
  const user = await userRepository.findByUser(username);
  if (user){
    const validPassword = passwordHelper.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Incorrect password");
    }
    const token = await tokenHelper.generate(user.id_user, user.role);
    return token;
  }
  throw new Error("User not found");
};

export const register = async(userToCreate: any, userRepository: UserRepository, passwordHelper: PasswordHelper, tokenHelper: TokenHelper): Promise<string> => {
  if (await userRepository.usernameExists(userToCreate)) {
    throw new Error("The username already exists.");
  }
  if (await userRepository.emailExists(userToCreate)) {
    throw new Error("The email already exists.");
  }
  userToCreate.password = passwordHelper.encrypt(userToCreate.password);
  const user = await userRepository.create(userToCreate);
  const token = await tokenHelper.generate(user.id_user, user.role);
  return token;
};
