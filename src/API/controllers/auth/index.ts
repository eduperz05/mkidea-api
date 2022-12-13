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

export const registerController = async(req: Request, res: Response) => {
  try {
    if (!req.body.username || 
      !req.body.email || 
      !req.body.password || 
      !req.body.role) {
      res.status(400).json("A obligatory parameter is missing on body.");
    }
    // const userRepository = new UserRepositorySequelize();
  } catch (err: any) {
    res.status(400).json(err);
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