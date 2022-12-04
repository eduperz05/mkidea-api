/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { findUsers, createUser } from ".";
import { UserRepository } from "../../API/repositories/UserRepository";

class UserRepositoryMock implements UserRepository {
  public findAll(): any {
    return null;
  }
  public findByPk(id_user: number): any {
    return null;
  }
  public findByUser(value: string): any {
    return null;
  }
  public findByEmail(value: string): any {
    return null;
  }
  public create(userToCreate: any): any {
    return userToCreate;
  }
  public destroy(id_user: number): any {
    return;
  }
  public update(id_user: number, userToUpdate: any): any {
    return null;
  }

  public usernameExists(userToCreate: any): any {
    return false;
  }
  public emailExists(userToCreate: any): any {
    return false;
  }
}

const user = {
  username: "test",
  email: "test@mail.com",
  toJSON: () => user,
};

describe("findUsers", () => {
  it("should return an empty array", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findAll = jest.fn().mockReturnValue([]);
    await expect(findUsers(userRepository, false)).rejects.toThrowError("No users on database, please create one before trying to find.");
  });

  it("should return an array of unfiltered users", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findAll = jest.fn().mockReturnValue([user]);
    await expect(findUsers(userRepository, false)).resolves.toEqual([user]);
  });

  it("should return an array of filtered users", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findAll = jest.fn().mockReturnValue([user]);
    await expect(findUsers(userRepository, true)).resolves.toEqual([user]);
  });
});

describe("createUser", () => {

  it("User already exists.", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.usernameExists = jest.fn().mockReturnValue(true);
    await expect(createUser(user, userRepository)).rejects.toThrowError("The username already exists.");
  });

  it("User already exists.", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.emailExists = jest.fn().mockReturnValue(true);
    await expect(createUser(user, userRepository)).rejects.toThrowError("The email already exists.");
  });

  it("User created.", async() => {
    const userRepository = new UserRepositoryMock();
    const result = await createUser(user, userRepository);
    expect(result).toEqual(user);
  });
});