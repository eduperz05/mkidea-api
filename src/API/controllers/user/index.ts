
import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.status(200).send("Users");
};

export const getUser = (req: Request, res: Response) => {
  res.status(200).send("Users");
};

export const postUser = (req: Request, res: Response) => {
  res.status(200).send("Users");
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).send("Users");
};

export const changeUser = (req: Request, res: Response) => {
  res.status(200).send("Users");
};