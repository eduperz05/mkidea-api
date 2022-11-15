
import { Request, Response } from "express";

exports.getUsers = (req: Request, res: Response) => {
  res.status(200).send("Users");
};

