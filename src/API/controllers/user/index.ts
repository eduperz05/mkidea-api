
import { Request, Response } from "express";
import { User } from "../../models/user";

export const getUsers = async(req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json({ users });
  return;
};

export const getUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.status(200).json({ user });
  return;
};

export const postUser = async(req: Request, res: Response) => {
  let user = await User.create({ ...req.body });
  return res.status(201).json({ user });
};

export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  const deleteUser = await User.findByPk(id);
  User.destroy({ where: { id } });
  return res.status(200).json({ deleteUser });
};

export const changeUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  await User.update({ ...req.body }, { where: { id } });
  const updatedUser = await User.findByPk(id);
  return res.status(200).json({ updatedUser });
};