import { UserRepository } from "../../API/repositories/UserRepository";
import { comparePassword } from "../../utils/comparePassword";
import { generateToken } from "../../utils/generateToken";

export const login = async(username: string, password: string, userRepository: UserRepository): Promise<string> => {
  const user = await userRepository.findByUser(username);
  if (user){//(await userRepository.usernameExists(username)) {

    const validPassword = comparePassword(password, user.password);
    if (!validPassword) {
      throw new Error("Incorrect password");
    }
  
    const token = await generateToken(user.id_user);
    return token;
  }
  throw new Error("User not found");
};