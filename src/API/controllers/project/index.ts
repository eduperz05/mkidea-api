
import { Request, Response } from "express";
import { Project } from "../../models/project";

export const getProjects = async(req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json({ projects });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const getProject = async(req: Request, res: Response) => {
  const { id_project } = req.params;
  try {
    const project = await Project.findByPk(id_project);
    res.status(200).json({ project });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const postProject = async(req: Request, res: Response) => {
  try {
    const proj = await Project.create(req.body);
    res.status(201).json({ proj });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const deleteProject = async(req: Request, res: Response) => {
  const { id_project } = req.params;
  try {
    const deleteProj = await Project.findByPk(id_project);
    Project.destroy({ where: { id_project } });
    res.status(200).json({ deleteProj });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const changeProject = async(req: Request, res: Response) => {
  const { id_project } = req.params;
  const allowedUpdates = 
  ["name", 
    "description", 
    "status"];
  const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" });
    return;
  }

  try {
    await Project.update({ ...req.body }, { where: { id_project } });
    const updatedProj = await Project.findByPk(id_project);
    res.status(200).json({ updatedProj });
    return;
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};