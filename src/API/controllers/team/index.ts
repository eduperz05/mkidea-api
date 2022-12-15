import { AuthRequest, AuthResponse } from "../../../types/index";
import { TeamRepositorySequelize } from "../../repositories/TeamRepository";
import { ProjectRepositorySequelize } from "../../repositories/ProjectRepository";
import { RoleHelperBinary } from "../../../utils/roleHelper";
import { findTeams, findTeamByPk, findTeamByProject, createTeam, deleteTeam, updateUserOnTeam, userOnTeam } from "../../../service/team";
import { checkOwnerOfProject } from "../../../service/project";

export const getTeamsController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    const teamRepository = new TeamRepositorySequelize();
    const teams = await findTeams(teamRepository, false);
    res.status(200).json(teams);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_team) {
      res.status(400).json("No id_team parameter");
      return;
    }
    const { id_team } = req.params;
    const teamRepository = new TeamRepositorySequelize();
    const team = await findTeamByPk(parseInt(id_team), teamRepository, false);
    const id_project = team.id_project;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const isOnTeam = await userOnTeam(id_user_request, id_team, teamRepository);
    const projectRepository = new ProjectRepositorySequelize();
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, id_project, id_user_request);
    const roleHelper = new RoleHelperBinary();
    if (!isOwnerOfProject || !isOnTeam || !roleHelper.isAdmin(role_user_request)) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    res.status(200).json(team);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamsPublicController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    const teamRepository = new TeamRepositorySequelize();
    const teams = await findTeams(teamRepository, true);
    res.status(200).json(teams);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getTeamPublicController = async(req: AuthRequest, res: AuthResponse) => {
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

export const getTeamByProjectController = async(req: AuthRequest, res: AuthResponse) => {
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

export const postTeamController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.body.id_project ||
      !req.body.id_users ||
      !req.body.role) {
      res.status(400).json("A obligatory parameter is missing on body.");
      return;
    }
    const projectRepository = new ProjectRepositorySequelize();
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, req.body.id_project, req.user.userId);
    if (!isOwnerOfProject) {
      res.status(401).json("This user has no privileges to proceed with this action");
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

export const deleteTeamController = async(req: AuthRequest, res: AuthResponse) => {
  try {
    if (!req.params.id_team) {
      res.status(400).json("No id_team parameter");
      return;
    }
    const id_team = parseInt(req.params.id_team);
    const teamRepository = new TeamRepositorySequelize();
    const deleteUserOnTeam = await findTeamByPk(id_team, teamRepository, false);
    const { id_project, id_users } = deleteUserOnTeam;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const projectRepository = new ProjectRepositorySequelize();
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, id_project, id_user_request);
    const roleHelper = new RoleHelperBinary();
    if (!isOwnerOfProject || !roleHelper.isAdmin(role_user_request) || id_users !== id_user_request) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    await deleteTeam(id_team, teamRepository);
    res.status(200).json(deleteUserOnTeam);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const changeTeamController = async(req: AuthRequest, res: AuthResponse) => {
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
    const team = await findTeamByPk(id_team, teamRepository, false);
    const { id_project, id_users } = team;
    const { userId: id_user_request, role: role_user_request } = req.user;
    const projectRepository = new ProjectRepositorySequelize();
    const isOwnerOfProject = await checkOwnerOfProject(projectRepository, id_project, id_user_request);
    const roleHelper = new RoleHelperBinary();
    if (!isOwnerOfProject || !roleHelper.isAdmin(role_user_request) || id_users !== id_user_request) {
      res.status(401).json("This user has no privileges to proceed with this action");
      return;
    }
    await updateUserOnTeam(id_team, req.body, teamRepository);
    const updatedUserOnTeam = await findTeamByPk(id_team, teamRepository, false);
    res.status(200).json(updatedUserOnTeam);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};