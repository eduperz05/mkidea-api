import { NewsRepository } from "../../API/repositories/NewsRepository";
import { findNews, findNewsById, findNewsByTitle } from ".";

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
  title: "test"
};

describe("findNews", () => {
  it("should return an empty array", async() => {
    const newsRepository = new NewsRepositoryMock();
    newsRepository.findAll = jest.fn().mockReturnValue([]);
    await expect(findNews(newsRepository, false)).rejects.toThrowError("No news on database, please create one before trying to find.");
  });
});

describe("findNewsById", () => {
  it("should return News not found", async() => {
    const newsRepository = new NewsRepositoryMock();
    await expect(findNewsById(1 ,newsRepository, false)).rejects.toThrowError("News not found");
  });
});

describe("findNewsByTitle", () => {
  it("should return News not found", async() => {
    const newsRepository = new NewsRepositoryMock();
    await expect(findNewsByTitle("test" ,newsRepository)).rejects.toThrowError("News not found");
  });
//   it("should return news object", async() => {
//     const newsRepository = new NewsRepositoryMock();
//     newsRepository.findByTitle() = ;
//     await expect(findNewsByTitle("test" ,newsRepository)).rejects.toThrowError("News not found");
//   });
});