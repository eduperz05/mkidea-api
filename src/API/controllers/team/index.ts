import { Request, Response } from "express";
import { TeamRepository } from "../../repositories/TeamRepository";
import { findTeams, findTeam, findTeamByProject, createTeam, deleteTeam, updateUserOnTeam } from "../../../service/team";

export const getTeamsController = async(req: Request, res: Response) => {
  try {
    const teamRepository = new TeamRepository();
    const teams = await findTeams(teamRepository);
    res.status(200).json(teams);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getTeamController = async(req: Request, res: Response) => {
  const { id_team } = req.params;
  try {
    const teamRepository = new TeamRepository();
    const team = await findTeam(id_team, teamRepository);
    res.status(200).json(team);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const getTeamByProjectController = async(req: Request, res: Response) => {
  const { id_project } = req.params;
  try {
    const teamRepository = new TeamRepository();
    const teams = await findTeamByProject(id_project, teamRepository);
    res.status(200).json(teams);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const postTeamController = async(req: Request, res: Response) => {
  try {
    const teamRepository = new TeamRepository();
    const team = await createTeam(req.body, teamRepository);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const deleteTeamController = async(req: Request, res: Response) => {
  const { id_team } = req.params;
  try {
    const teamRepository = new TeamRepository();
    const deleteUserOnTeam = await findTeam(id_team, teamRepository);
    await deleteTeam(id_team, teamRepository);
    res.status(200).json(deleteUserOnTeam);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};

export const changeTeamController = async(req: Request, res: Response) => {
  const { id_team } = req.params;
  try {
    const teamRepository = new TeamRepository();
    await updateUserOnTeam(id_team, req.body, teamRepository);
    const updatedUserOnTeam = await findTeam(id_team, teamRepository);
    res.status(200).json(updatedUserOnTeam);
  } catch (err) {
    res.status(400).json(err);
  }
  return;
};