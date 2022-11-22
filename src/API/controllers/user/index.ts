
import { Request, Response } from "express";
import { createUser } from "../../../service/user";
import { User } from "../../models/user";

export const getUsers = async(req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const getUser = async(req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const user = await User.findByPk(id_user);
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};


export const postUser = async(req: Request, res: Response) => {
  try {
    const user = await createUser(req.body, User.create);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const deleteUser = async(req: Request, res: Response) => {
  const { id_user } = req.params;
  try {
    const deleteUser = await User.findByPk(id_user);
    User.destroy({ where: { id_user } });
    res.status(200).json({ deleteUser });
    return;
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

export const changeUser = async(req: Request, res: Response) => {
  const { id_user } = req.params;
  const allowedUpdates = ["username", "firstname", "lastname", "email", "password", "role"];
  const isValid_userOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
  if (!isValid_userOperation) {
    res.status(400).send({ error: "Invalid updates!" });
    return;
  }

  try {
    await User.update({ ...req.body }, { where: { id_user } });
    const updatedUser = await User.findByPk(id_user);
    res.status(200).json({ updatedUser });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};