import { findUsers, findUser, findUserByUsername, findUserByEmail, createUser, deleteUser, updateUser } from ".";
import { UserRepository } from "../../API/repositories/UserRepository";

class UserRepositoryMock implements UserRepository {
  public findAll(): any {
    return null;
  }
  public findByPk(): any {
    return null;
  }
  public findByUser(): any {
    return null;
  }
  public findByEmail(): any {
    return null;
  }
  public create(): any {
    return null;
  }
  public destroy(): any {
    return;
  }
  public update(): any {
    return null;
  }

  public usernameExists(): any {
    return false;
  }
  public emailExists(): any {
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

describe("findUser", () => {
  it("should return an error if the user is not found", async() => {
    const userRepository = new UserRepositoryMock();
    await expect(findUser(1, userRepository, false)).rejects.toThrowError("User not found.");
  });
  
  it("should return a unfiltered user", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findByPk = jest.fn().mockReturnValue(user);
    await expect(findUser(1, userRepository, false)).resolves.toEqual(user);
  });

  it("should return a filtered user", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findByPk = jest.fn().mockReturnValue(user);
    await expect(findUser(1, userRepository, true)).resolves.toEqual(user);
  });
});

describe("findUserByName", () => {
  it("should return an error if the user is not found", async() => {
    const userRepository = new UserRepositoryMock();
    await expect(findUserByUsername("test", userRepository)).rejects.toThrowError("User not found.");
  });

  it("should return a user by his name", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findByUser = jest.fn().mockReturnValue(user);
    await expect(findUserByUsername("test", userRepository)).resolves.toEqual(user);
  });
});

describe("findUserByEmail", () => {
  it("should return an error if the email is not found", async() => {
    const userRepository = new UserRepositoryMock();
    await expect(findUserByEmail("test", userRepository)).rejects.toThrowError("User not found.");
  });

  it("should return a user by his email", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.findByEmail = jest.fn().mockReturnValue(user);
    await expect(findUserByEmail("test", userRepository)).resolves.toEqual(user);
  });
});

describe("createUser", () => {

  it("User already exists.", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.usernameExists = jest.fn().mockReturnValue(true);
    await expect(createUser(user, userRepository)).rejects.toThrowError("The username already exists.");
  });

  it("Email already exists.", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.emailExists = jest.fn().mockReturnValue(true);
    await expect(createUser(user, userRepository)).rejects.toThrowError("The email already exists.");
  });

  it("User created.", async() => {
    const userRepository = new UserRepositoryMock();
    userRepository.create = jest.fn().mockReturnValue(user);
    const result = await createUser(user, userRepository);
    expect(result).toEqual(user);
  });
});

describe("deleteUser", () => {
  it("should return an error if the user is not found", async() => {
    const userRepository = new UserRepositoryMock();
    await expect(deleteUser(1, userRepository)).rejects.toThrowError("User not found.");
  });
});

describe("updateUser", () => {

  const userUpdate = {
    username: "test",
    email: "test@mail.com",
  };
  it("should return an error if the parameters are invalid", async() => {
    const userRepository = new UserRepositoryMock();
    await expect(updateUser(1, user, userRepository)).rejects.toThrowError("Invalid update parameters.");
  });
  
  it("should return an error if the user is not found", async() => {
    const userRepository = new UserRepositoryMock();
    await expect(updateUser(1, userUpdate, userRepository)).rejects.toThrowError("User not found.");
  });
});