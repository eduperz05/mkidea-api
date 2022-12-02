
import { Request, Response } from "express";
import { findNews, findNewsById, findNewsByTitle, createNews, deleteNews, updateNews } from "../../../service/news";
import { NewsRepositorySequelize } from "../../repositories/NewsRepository";

export const getNewsController = async(req: Request, res: Response) => {
  try {
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNews(newsRepository);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getNewsByIdController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsById(parseInt(id_news), newsRepository);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const getNewsByTitleController = async(req: Request, res: Response) => {
  try {
    if (!req.params.title) {
      res.status(400).json("No title parameter");
    }
    const { title } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsByTitle(title, newsRepository);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const postNewsController = async(req: Request, res: Response) => {
  try {
    if (req.body.id_user ||
      !req.body.title || 
      !req.body.description || 
      !req.body.url) {
      res.status(400).json("A obligatory parameter is missing on body.");
    }
    const newsRepository = new NewsRepositorySequelize();
    const news = await createNews(req.body, newsRepository);
    res.status(201).json(news);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const deleteNewsController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsById(parseInt(id_news), newsRepository);
    await deleteNews(parseInt(id_news), newsRepository);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};

export const changeNewsController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    await updateNews(parseInt(id_news), req.body, newsRepository);
    const updatedNews = await findNewsById(parseInt(id_news), newsRepository);
    res.status(200).json(updatedNews);
  } catch (err: any) {
    res.status(400).json(err);
  }
  return;
};