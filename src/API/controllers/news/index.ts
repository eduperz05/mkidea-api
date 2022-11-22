
import { Request, Response } from "express";
import { News } from "../../models/news";

export const getNews = async(req: Request, res: Response) => {
  try {
    const news = await News.findAll();
    res.status(200).json({ news });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const getNew = async(req: Request, res: Response) => {
  const { id_news } = req.params;
  try {
    const project = await News.findByPk(id_news);
    res.status(200).json({ project });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const postNew = async(req: Request, res: Response) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json({ news });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const deleteNew = async(req: Request, res: Response) => {
  const { id_news } = req.params;
  try {
    const deleteNews = await News.findByPk(id_news);
    News.destroy({ where: { id_news } });
    res.status(200).json({ deleteNews });
  } catch (err) {
    res.status(400).json({ err });
  }
  return;
};

export const changeNew = async(req: Request, res: Response) => {
  const { id_news } = req.params;
  const allowedUpdates = 
  ["title", 
    "description", 
    "url"];
  const isValidOperation = Object.keys(req.body).every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" });
    return;
  }

  try {
    await News.update({ ...req.body }, { where: { id_news } });
    const updatedNews = await News.findByPk(id_news);
    res.status(200).json({ updatedNews });
    return;
  } catch (err) {
    res.status(400).json({ err });
    return;
  }
};