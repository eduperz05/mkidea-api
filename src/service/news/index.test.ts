import { NewsRepository } from "../../API/repositories/NewsRepository";
import { createNews, findNews, findNewsById, findNewsByTitle, updateNews } from ".";

class NewsRepositoryMock implements NewsRepository {

  public findAll(): any {
    return null;
  }

  public findByPk(): any {
    return null;
  }

  public findByTitle(): any {
    return null;
  }

  public create(newsToCreate: any): any {
    return newsToCreate;
  }

  public destroy(): any {
    return null;
  }

  public update(): any {
    return null;
  }

  public titleExists(): any {
    return false;
  }
}

const news = {
  title: "test",
  description: "descripcion de prueba",
  toJSON: () => news
};

describe("findNews", () => {
  it("should return an empty array", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findAll = jest.fn().mockReturnValue([]);
    await expect(findNews(newsRepository, false)).rejects.toThrowError("No news on database, please create one before trying to find.");
  });
  it("should return an array of unfiltered news", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findAll = jest.fn().mockReturnValue([news]);
    await expect(findNews(newsRepository, false)).resolves.toEqual([news]);
  });
  it("should return an array of filtered news", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findAll = jest.fn().mockReturnValue([news]);
    await expect(findNews(newsRepository, true)).resolves.toEqual([news]);
  });
});

describe("findNewsById", () => {
  it("should return News not found", async() => {
    const newsRepository = new NewsRepositoryMock();
    await expect(findNewsById(1 ,newsRepository, false)).rejects.toThrowError("News not found");
  });
  it("should return an array of unfilter news", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findByPk = jest.fn().mockReturnValue(news);
    await expect(findNewsById(1,newsRepository, false)).resolves.toEqual(news);
  });
  it("should return an array of filtered news", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findByPk = jest.fn().mockReturnValue(news);
    await expect(findNewsById(1,newsRepository, true)).resolves.toEqual(news);
  });
});

describe("findNewsByTitle", () => {
  it("should return News not found", async() => {
    const newsRepository = new NewsRepositoryMock();
    await expect(findNewsByTitle("test" ,newsRepository)).rejects.toThrowError("News not found");
  });
  it("should return news object", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findByTitle = jest.fn().mockReturnValue(news);
    await expect(findNewsByTitle("test" ,newsRepository)).resolves.toEqual(news);
  });
});
describe("createNews", () => {
  it("should return News not found", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.titleExists = jest.fn().mockReturnValue(true);
    await expect(createNews("test" ,newsRepository)).rejects.toThrowError("The title already exists.");
  });
  it("should return news object", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.create = jest.fn().mockReturnValue(news);
    await expect(createNews("test" ,newsRepository)).resolves.toEqual(news);
  });
});
describe("update news",() => {
  it("should return News not found", async() => {
    const newsRepository = new NewsRepositoryMock();
    await expect(updateNews(1,"test",newsRepository)).rejects.toThrowError("Invalid update parameters.");
  });
});