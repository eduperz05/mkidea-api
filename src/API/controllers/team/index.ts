import { Request, Response } from "express";
import { Team } from "../../models/team";

export const getTeams = async(req: Request, res: Response) => {
  const teams = await Team.findAll();
  res.status(200).json({ teams });
  return;  
};

export const getTeam = async(req: Request, res: Response) => {
  const { id } = req.params;
  const team = await Team.findByPk(id);
  res.status(200).json({ team });
  return;
};

export const postTeam = async(req: Request, res: Response) => {
  let team = await Team.create({ ...req.body });
  res.status(201).json({ team });
  return;
};

export const deleteTeam = async(req: Request, res: Response) => {
  const { id } = req.params;
  const deleteTeam = await Team.findByPk(id);
  Team.destroy({ where: { id } });
  res.status(200).json({ deleteTeam });
  return;
};

export const changeTeam = (req: Request, res: Response) => {
  res.status(200).send("Users");
};