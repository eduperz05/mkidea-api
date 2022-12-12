import { Request, Response } from "express";  
import { login } from "../../../service/auth";
import { findUserByUsername } from "../../../service/user";
import { UserRepositorySequelize } from "../../repositories/UserRepository";

export const loginController = async(req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username && !password){
      res.status(400).json("No username parameter or password parameter");
    }
    const userRepository = new UserRepositorySequelize();
    const user = await findUserByUsername(username, userRepository);
    const token = await login(username, password, userRepository);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user });
  } catch (err){
    res.status(400).json("User not found");
  }
  return;
};