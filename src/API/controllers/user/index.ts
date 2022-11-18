
import { Request, Response } from "express";
import { User } from "../../models/user";

export const getUsers = (req: Request, res: Response) => {
  const users = User.findAll();
  return res.status(200).json({ users });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = User.findByPk(id);
  return res.status(200).json({ user });
};

export const postUser = (req: Request, res: Response) => {
  let user = User.create({ ...req.body });
  return res.status(201).json({ user });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteUser = User.findByPk(id);
  User.destroy({ where: { id } });
  return res.status(200).json({ deleteUser });
};

export const changeUser = (req: Request, res: Response) => {
  const { id } = req.params;
  User.update({ ...req.body }, { where: { id } });
  const updatedUser = User.findByPk(id);
  return res.status(200).json({ updatedUser });
};