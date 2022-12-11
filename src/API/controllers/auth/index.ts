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
    res.status(200).json({ user, token });
  } catch (err){
    res.status(400).json("User not found");
  }
  return;
};


// try {
//   if (!req.body.username && !req.body.password) {
//     res.status(400).json("No username parameter or password parameter");
//   }
//   const { username, password } = req.body;
//   const userRepository = new UserRepositorySequelize();
//   const user = await findUserByUsername(username, userRepository);
//   const validPassword = comparePassword(password, user.password);
//   if (!validPassword) {
//     res.status(400).json("Incorrect password");
//   }
//   const token = await generateToken(user.id_user);
//   res.status(200).json({ user, token });
// } catch (err) {
//   res.status(400).json(err);
// }
// return;