import { Request, Response } from "express";
import { TeamRepositorySequelize } from "../../repositories/TeamRepository";

import { findTeams, findTeamByPk, findTeamByProject, createTeam, deleteTeam, updateUserOnTeam } from "../../../service/team";

export const getTeamsController = async(req: Request, res: Response) => {
  try {
    const teamRepository = new TeamRepositorySequelize();
    const teams = await findTeams(teamRepository, false);
    res.status(200).json(teams);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_team) {
      res.status(400).json("No id_team parameter");
      return;
    }
    const { id_team } = req.params;
    const teamRepository = new TeamRepositorySequelize();
    const team = await findTeamByPk(parseInt(id_team), teamRepository, false);
    res.status(200).json(team);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamsPublicController = async(req: Request, res: Response) => {
  try {
    const teamRepository = new TeamRepositorySequelize();
    const teams = await findTeams(teamRepository, true);
    res.status(200).json(teams);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamPublicController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_team) {
      res.status(400).json("No id_team parameter");
      return;
    }
    const { id_team } = req.params;
    const teamRepository = new TeamRepositorySequelize();
    const team = await findTeamByPk(parseInt(id_team), teamRepository, true);
    res.status(200).json(team);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamByProjectController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_project) {
      res.status(400).json("No id_project parameter");
      return;
    }
    const { id_project } = req.params;
    const teamRepository = new TeamRepositorySequelize();
    const teams = await findTeamByProject(parseInt(id_project), teamRepository);
    res.status(200).json(teams);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const postTeamController = async(req: Request, res: Response) => {
  try {
    if (!req.body.id_project ||
      !req.body.id_users ||
      !req.body.role) {
      res.status(400).json("A obligatory parameter is missing on body.");
      return;
    }
    const teamRepository = new TeamRepositorySequelize();
    const team = await createTeam(req.body, teamRepository);
    res.status(201).json(team);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const deleteTeamController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_team) {
      res.status(400).json("No id_team parameter");
      return;
    }
    const { id_team } = req.params;
    const teamRepository = new TeamRepositorySequelize();
    const deleteUserOnTeam = await findTeamByPk(parseInt(id_team), teamRepository, false);
    await deleteTeam(parseInt(id_team), teamRepository);
    res.status(200).json(deleteUserOnTeam);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const changeTeamController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_team) {
      res.status(400).json("No id_user parameter");
      return;
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
      return;
    }
    const id_team = parseInt(req.params.id_team);
    const teamRepository = new TeamRepositorySequelize();
    await updateUserOnTeam(id_team, req.body, teamRepository);
    const updatedUserOnTeam = await findTeamByPk(id_team, teamRepository, false);
    res.status(200).json(updatedUserOnTeam);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};