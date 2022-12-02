import { NewsRepository } from "../../API/repositories/NewsRepository";

export const findNews = async(newsRepository: NewsRepository) => {
  const news = await newsRepository.findAll();
  if (news.length === 0) {
    throw new Error("No news on database, please create one before trying to find.");
  }
  return news;
};

export const findNewsById = async(id_news: number, newsRepository: NewsRepository) => {
  const news = await newsRepository.findByPk(id_news);
  if (!news) {
    throw new Error("News not found!");
  }
  return news;
};

export const findNewsByTitle = async(title: string, newsRepository: NewsRepository) => {
  const news = await newsRepository.findByTitle(title);
  if (!news) {
    throw new Error("News not found!");
  }
  return news;
};

export const createNews = async(newsToCreate: any, newsRepository: NewsRepository) => {
  if (await newsRepository.titleExists(newsToCreate)) {
    throw new Error("The title already exists.");
  }
  const news = await newsRepository.create(newsToCreate);
  return news;
};

export const deleteNews = async(id_news: number, newsRepository: NewsRepository) => {
  await newsRepository.destroy(id_news);
};

export const updateNews = async(id_news: number, newsToUpdate: any, newsRepository: NewsRepository) => {
  const allowedUpdates = ["title", "description", "url"];
  const isValid_newsOperation = Object.keys(newsToUpdate).every((update) => allowedUpdates.includes(update));
  if (!isValid_newsOperation) {
    throw new Error("Invalid update parameters.");
  }
  await newsRepository.update(id_news, newsToUpdate);
};