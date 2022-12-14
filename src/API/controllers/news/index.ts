
import { Request, Response } from "express";
import { findNews, findNewsById, findNewsByTitle, createNews, deleteNews, updateNews } from "../../../service/news";
import { NewsRepositorySequelize } from "../../repositories/NewsRepository";

export const getNewsController = async(req: Request, res: Response) => {
  try {
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNews(newsRepository, false);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getNewsByIdController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
      return;
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsById(parseInt(id_news), newsRepository, false);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getNewsPublicController = async(req: Request, res: Response) => {
  try {
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNews(newsRepository, true);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getNewsByIdPublicController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
      return;
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsById(parseInt(id_news), newsRepository, true);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const getNewsByTitleController = async(req: Request, res: Response) => {
  try {
    if (!req.params.title) {
      res.status(400).json("No title parameter");
      return;
    }
    const { title } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsByTitle(title, newsRepository);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const postNewsController = async(req: Request, res: Response) => {
  try {
    if (!req.body.id_user ||
      !req.body.title || 
      !req.body.description || 
      !req.body.url) {
      res.status(400).json("A obligatory parameter is missing on body.");
      return;
    }
    const newsRepository = new NewsRepositorySequelize();
    const news = await createNews(req.body, newsRepository);
    res.status(201).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const deleteNewsController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
      return;
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    const news = await findNewsById(parseInt(id_news), newsRepository, false);
    await deleteNews(parseInt(id_news), newsRepository);
    res.status(200).json(news);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};

export const changeNewsController = async(req: Request, res: Response) => {
  try {
    if (!req.params.id_news) {
      res.status(400).json("No id_news parameter");
      return;
    } else if (Object.keys(req.body).length === 0) {
      res.status(400).json("No body parameters");
      return;
    }
    const { id_news } = req.params;
    const newsRepository = new NewsRepositorySequelize();
    await updateNews(parseInt(id_news), req.body, newsRepository);
    const updatedNews = await findNewsById(parseInt(id_news), newsRepository, false);
    res.status(200).json(updatedNews);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
  return;
};