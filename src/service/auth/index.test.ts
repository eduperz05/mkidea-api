import { login } from ".";
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
}

export class TokenHelperMock implements TokenHelper {

  private SECRET_KEY: string | undefined;

  constructor() {
    this.SECRET_KEY = process.env.SECRET_KEY;
  }

  public async generate(userId: number): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const payload = { userId };
      if (!this.SECRET_KEY) {
        throw new Error("Password is undefined");
      }
      jwt.sign(payload, this.SECRET_KEY, {
        expiresIn: "4h"
      }, (err: any, token: any) => {
        if (err) {
          console.log(err);
          reject("Could not generate token");
        }
        resolve(token);
      });
    });
  }
}

const user = {
  id_user: 1,
  username: "johnsmith",
  password: "passwordHashed", 
};

describe("login", () => {
  it("should throw an error if the username does not exist", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.findByUser = jest.fn().mockReturnValue(null);
    await expect(login("test","pswd", userRepository, passwordHelper,tokenHelper)).rejects.toThrowError("User not found");
  });

  it("should throw an error if the password is incorrect", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.findByUser = jest.fn().mockResolvedValue(user);
    await expect(login("test","pswd", userRepository,passwordHelper,tokenHelper)).rejects.toThrow("Incorrect password");
  });

  it("should generate a token if the username and password are correct", async() => {
    const passwordHelper = new PasswordHelperMock;
    const userRepository = new UserRepositoryMock;
    const tokenHelper = new TokenHelperMock;
    userRepository.findByUser = jest.fn().mockResolvedValue(user);
    const result = await login("test","pswd", userRepository, passwordHelper,tokenHelper);
    console.log(result);
    expect(result).toEqual("");
  });
});