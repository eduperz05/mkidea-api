import { login, register } from ".";
import { UserRepository } from "../../API/repositories/UserRepository";
import { TokenHelper } from "../../utils/tokenHelper";
import { PasswordHelper } from "../../utils/passwordHelper";
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

class PasswordHelperMock implements PasswordHelper {
  public encrypt(): any {
    return "password";
  }
  public compare(): any {
    return true;
  }

  public validator(): any {
    return true;
  }
}

export class TokenHelperMock implements TokenHelper {

  private SECRET_KEY: string | undefined;

  constructor() {
    this.SECRET_KEY = process.env.SECRET_KEY;
  }
  public generate(): any {}
  public decode(): any {}
}

const user = {
  id_user: 1,
  username: "johnsmith",
  password: "passwordHashed", 
};

const passwordHelper = new PasswordHelperMock;
const userRepository = new UserRepositoryMock;
const tokenHelper = new TokenHelperMock;
    
describe("login", () => {
  it("should throw an error if the username does not exist", async() => {
    userRepository.findByUser = jest.fn().mockReturnValue(null);
    await expect(login("test","pswd", userRepository, passwordHelper,tokenHelper)).rejects.toThrowError("User not found");
  });

  it("should throw an error if the password is incorrect", async() => {
    userRepository.findByUser = jest.fn().mockResolvedValue(user);
    passwordHelper.compare = jest.fn().mockReturnValue(false);
    await expect(login("test","pswd", userRepository,passwordHelper,tokenHelper)).rejects.toThrowError("Incorrect password");
  });
  it("should return the token", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.findByUser = jest.fn().mockResolvedValue(user);
    tokenHelper.generate = jest.fn().mockReturnValue("");
    await expect(login("test","pswd", userRepository,passwordHelper,tokenHelper)).resolves.toEqual("");
  });

});

describe("register", () => {
  it("should throw an error if the username already exists", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.usernameExists = jest.fn().mockReturnValue(true);
    await expect(register(user, userRepository, passwordHelper,tokenHelper)).rejects.toThrowError("The username already exists.");
  });
  
  it("should throw an error if the email already exists.", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.emailExists = jest.fn().mockReturnValue(true);
    await expect(register(user, userRepository,passwordHelper,tokenHelper)).rejects.toThrowError("The email already exists.");
  });
  it("should return the token", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.create = jest.fn().mockReturnValue(user);
    tokenHelper.generate = jest.fn().mockReturnValue("");
    await expect(register(user, userRepository,passwordHelper,tokenHelper)).resolves.toEqual("");
  });
});