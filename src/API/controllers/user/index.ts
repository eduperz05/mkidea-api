
import { Request, Response } from "express";
import { findUsers, findUser, createUser, deleteUser, updateUser } from "../../../service/user";
import { User } from "../../models/user";
import { UserRepository } from "../../repositories/UserRepository";

export const getUsersController = async(req: Request, res: Response) => {
  try {
    const userRepository = new UserRepository();
    const users = await findUsers(userRepository);
    res.status(200).json({ users });
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getUserController = async(req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const userRepository = new UserRepository();
    const user = await findUser({ id_user }, userRepository);
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};


export const postUserController = async(req: Request, res: Response) => {
  try {
    const userRepository = new UserRepository();
    const user = await createUser(req.body, userRepository);
    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const deleteUserController = async(req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const userRepository = new UserRepository();
    const deletedUser = await findUser({ id_user }, userRepository);
    await deleteUser({ id_user }, userRepository);
    res.status(200).json({ deletedUser });
    return;
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

export const changeUserController = async(req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const userRepository = new UserRepository();
    await updateUser({ id_user }, req.body, userRepository);
    const updatedUser = await User.findByPk(id_user);
    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};