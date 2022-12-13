import { login } from ".";
import { UserRepository } from "../../API/repositories/UserRepository";
import { encryptPassword } from "../../utils/encryptPassword";
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

const passwordHashed = encryptPassword("password");

const user = {
  id_user: 1,
  username: "johnsmith",
  password: passwordHashed, 
};

describe("login", () => {
  it("should throw an error if the username does not exist", async() => {
    const userRepository = new UserRepositoryMock;
    userRepository.findByUser = jest.fn().mockReturnValue(null);
    await expect(login("test","pswd", userRepository)).rejects.toThrowError("User not found");
  });

  it("should throw an error if the password is incorrect", async() => {
    const userRepository = new UserRepositoryMock;
    userRepository.findByUser = jest.fn().mockResolvedValue(user);
    await expect(login("johnsmith", "password1", userRepository)).rejects.toThrow("Incorrect password");
  });

  it("should generate a token if the username and password are correct", async() => {
    const userRepository = new UserRepositoryMock;
    userRepository.findByUser = jest.fn().mockResolvedValue(user);
    const result = await login("johnsmith", "password", userRepository);
    console.log(result);
    expect(result).toEqual("");
  });
});