import { Request, Response } from "express";
import { createTeam } from "../../../service/team";
import { Team } from "../../models/team";
import { TeamRepository } from "../../repositories/TeamRepository";

export const getTeams = async(req: Request, res: Response) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json({ teams });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const getTeam = async(req: Request, res: Response) => {
  const { id_team } = req.params;
  try {
    const team = await Team.findByPk(id_team);
    res.status(200).json({ team });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const postTeam = async(req: Request, res: Response) => {
  try {
    const teamRepository = new TeamRepository();
    const team = await createTeam(req.body, teamRepository);
    res.status(201).json({ team });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const deleteTeam = async(req: Request, res: Response) => {
  const { id_team } = req.params;
  try {
    const deleteTeam = await Team.findByPk(id_team);
    Team.destroy({ where: { id_team } });
    res.status(200).json({ deleteTeam });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const changeTeam = async(req: Request, res: Response) => {
  const { id_team } = req.params;
  const allowedUpdates = ["id_project", "id_users"];
  const isValid_userOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
  if (!isValid_userOperation) {
    res.status(400).send({ error: "Invalid_team updates!" });
    return;
  }

  try {
    await Team.update({ ...req.body }, { where: { id_team } });
    const updatedTeam = await Team.findByPk(id_team);
    res.status(200).json({ updatedTeam });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};