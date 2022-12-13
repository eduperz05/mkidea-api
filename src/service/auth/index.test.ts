import { login } from ".";
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

describe("login", () => {
  it("should generate a token if the username and password are correct", async() => {
    // Set up the user repository to return a known user
    const userRepository = new UserRepositoryMock;
    userRepository.findByUser = jest.fn().mockResolvedValue({
      // id_user: 1,
      username: "johnsmith",
      password: "hashed-password",
    });
    // const user = {
    //   findByUser: jest.fn().mockResolvedValue({
    //     id_user: 1,
    //     username: "johnsmith",
    //     password: "hashed-password",
    //   }) };
   

    // Call the login function
    const result = await login("johnsmith", "password", userRepository);

    // Check that the generated token matches the expected value
    expect(result).toEqual("generated-token");
  });

  it("should throw an error if the username does not exist", async() => {
    // Set up the user repository to return null when searching for the user
    const userRepository = new UserRepositoryMock;
    userRepository.findByUser = jest.fn().mockResolvedValue(null);

    // Check that the login function throws the expected error
    await expect(login("invalid-username", "password", userRepository)).rejects.toThrow("User not found");
  });

  it("should throw an error if the password is incorrect", async() => {
    // Set up the user repository to return a user with a different password
    const userRepository = {
      findByUser: jest.fn().mockResolvedValue({
        id_user: 1,
        username: "johnsmith",
        password: "incorrect-password",
      }),
    };

    // Check that the login function throws the expected error
    await expect(login("johnsmith", "password", userRepository)).rejects.toThrow("Incorrect password");
  });
});