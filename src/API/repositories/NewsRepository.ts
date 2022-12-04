import { News } from "../models/news";

export interface NewsRepository {
  findAll(): Promise<News[]>;
  findByPk(id: number): Promise<News|null>;
  findByTitle(value: string): Promise<News|null>;
  create(news: any): Promise<News>;
  destroy(id: number): Promise<void>;
  update(id: number, news: any): Promise<News|null>;
  titleExists(news: any): Promise<boolean>;
}

export class NewsRepositorySequelize implements NewsRepository {
    
  public async findAll(): Promise<News[]> {
    return News.findAll();
  }
    
  public async findByPk(id_news: number): Promise<News|null> {
    return News.findByPk(id_news);
  }
    
  public async findByTitle(value: string): Promise<News|null> {
    return News.findOne({ where: { title: value } });
  }
    
  public async create(newsToCreate: any): Promise<News> {
    return News.create(newsToCreate);
  }
    
  public async destroy(id_news: number): Promise<void> {
    News.destroy({ where: { id_news } });
  }
  
  public async update(id_news: number, newsToUpdate: any): Promise<News|null> {
    await News.update({ ...newsToUpdate }, { where: { id_news } });
    return News.findByPk(id_news);
  }

  public async titleExists(newsToCreate: any): Promise<boolean> {
    const title = newsToCreate.title;
    const sameTitle = await News.findAll({ where: { title: title } });
    if (sameTitle.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}