import { NewsRepository } from "../../API/repositories/NewsRepository";
import { findNews, createNews } from ".";

export class NewsRepositoryMock implements NewsRepository {

    public async findAll(): any {
        return null;
    }

    public async findByPk(id_news: number): any {
        return null;
    }

    public async findByTitle(value: string): any {
        return null;
    }

    public async create(newsToCreate: any): any {
        return newsToCreate;
    }

    public async destroy(id_news: number): any {
        return null;
    }

    public async update(id_news: number, newsToUpdate: any): any {
        return null;
    }

    public async titleExists(newsToCreate: any): any {
        return false;
    }
}

const news = {
    title: "test"
}