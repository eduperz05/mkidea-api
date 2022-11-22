
import { Request, Response } from "express";
import { User } from "../../models/user";

export const getUsers = async(req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
    return;
  } catch (error) {
    res.status(500).json({ error });
    return;
  }
};

export const getUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.status(200).json({ user });
    return;
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

export const postUser = async(req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
    return;
  } catch (err) {
    res.status(500).json({ err });
    return;
  }
};

export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByPk(id);
    User.destroy({ where: { id } });
    res.status(200).json({ deleteUser });
    return;
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};

export const changeUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  const allowedUpdates = ["username", "firstname", "lastname", "email", "password", "role"];
  const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" });
    return;
  }

  try {
    await User.update({ ...req.body }, { where: { id } });
    const updatedUser = await User.findByPk(id);
    res.status(200).json({ updatedUser });
    return;
  } catch (err) {
    res.status(500).json({ err });
    return;
  }
};