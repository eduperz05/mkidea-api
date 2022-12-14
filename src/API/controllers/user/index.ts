import { Request, Response } from "express";
import { findUsers, findUser, findUserByUsername, createUser, deleteUser, updateUser, findUserByEmail } from "../../../service/user";
import { UserRepositorySequelize } from "../../repositories/UserRepository";
import { PasswordHelperBcrypt } from "../../../utils/passwordHelper";

// TODO: Preguntar a raul sobre como evitar enviar informacion sensible al cliente

export const getUsersController = async(req: Request, res: Response) => {
  try {
    const userRepository = new UserRepositorySequelize();
    const users = await findUsers(userRepository, false);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getUsersPublicController = async(req: Request, res: Response) => {
  try {
    const userRepository = new UserRepositorySequelize();
    const users = await findUsers(userRepository, true);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getUserController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
    }
    const { id_user } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUser(parseInt(id_user), userRepository, false);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getUserPublicController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
    }
    const { id_user } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUser(parseInt(id_user), userRepository, true);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getUserByUsernameController = async(req: Request, res: Response) => {
  try {
    if (!req.params.username) {
      res.status(400).json("No username parameter");
    }
    const { username } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUserByUsername(username, userRepository);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getUserByEmailController = async(req: Request, res: Response) => {
  try {
    if (!req.params.email) {
      res.status(400).json("No email parameter");
    }
    const { email } = req.params;
    const userRepository = new UserRepositorySequelize();
    const user = await findUserByEmail(email, userRepository);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const postUserController = async(req: Request, res: Response) => {
  try {
    if (!req.body.username || 
      !req.body.email || 
      !req.body.password || 
      !req.body.role ||
      !req.body.phone ||
      !req.body.about ||
      !req.body.avatar) {
      res.status(400).json("A obligatory parameter is missing on body.");
    }
    const userRepository = new UserRepositorySequelize();
    const passwordHelper = new PasswordHelperBcrypt();
    const user = await createUser(req.body, userRepository, passwordHelper); 
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const deleteUserController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
    }
    const { id_user } = req.params;
    const userRepository = new UserRepositorySequelize();
    const deletedUser = await findUser(parseInt(id_user), userRepository, false);
    await deleteUser(parseInt(id_user), userRepository);
    res.status(200).json(deletedUser);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
  }
};

export const changeUserController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_user) {
      res.status(400).json("No id_user parameter");
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
    }
    const { id_user } = req.params;
    const userRepository = new UserRepositorySequelize();
    await updateUser(parseInt(id_user), req.body, userRepository);
    const updatedUser = await findUser(parseInt(id_user), userRepository, false);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};
