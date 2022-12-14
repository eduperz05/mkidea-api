import { Request, Response } from "express";  
import { login, register } from "../../../service/auth";
import { findUserByUsername } from "../../../service/user";
import { UserRepositorySequelize } from "../../repositories/UserRepository";
import { PasswordHelperBcrypt } from "../../../utils/passwordHelper";
import { TokenHelperJWT } from "../../../utils/tokenHelper";


export const loginController = async(req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username && !password){
      res.status(400).json("No username parameter or password parameter");
      return;
    }
    const userRepository = new UserRepositorySequelize();
    const passwordHelper = new PasswordHelperBcrypt();
    const tokenHelper = new TokenHelperJWT();
    const user = await findUserByUsername(username, userRepository);
    const token = await login(username, password, userRepository, passwordHelper, tokenHelper);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user });
  } catch (err){
    res.status(400).json("User not found");
  }
  return;
};

export const registerController = async(req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.role) {
      res.status(400).json("A obligatory parameter is missing on body.");
      return;
    }
    const userRepository = new UserRepositorySequelize();
    const passwordHelper = new PasswordHelperBcrypt();
    const tokenHelper = new TokenHelperJWT();
    const token = await register(req.body, userRepository, passwordHelper, tokenHelper);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json("User created");
  } catch (err) {
    res.status(400).json("Something went wrong, user not created.");
  }
  return;
};


export const logoutController = async(req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logout successful");
  } catch (err){
    res.status(400).json("Logout failed");
  }
  return;
};