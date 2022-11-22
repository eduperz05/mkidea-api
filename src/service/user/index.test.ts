import { createUser } from ".";


// No hay parametros

describe("createUser", () => {

  const iDontDoAnything = () => {
    return;
  };
  const user = {
    username: "test",
    email: "test@mail.com"
  };

  it("should return an error if there are no parameters", async() => {
    await expect(createUser({}, undefined)).rejects.toThrowError();
  });

  it("User already exists.", async() => {
    const createUserTest = () => {
      throw new Error("User already exists.");
    };
    await expect(createUser(user, createUserTest)).rejects.toThrowError("User already exists.");
  });

  it("User doen't have email", async() => {
    const noEmailUser = {
      username: "test",
    };
    const iDontDoAnything = () => {
      return;
    };
    await expect(createUser(noEmailUser, iDontDoAnything)).rejects.toThrowError();
  });
  it("Should return Exception if DB doesn't respond.", async() => {
    const failConnection = () => {
      throw new Error("DB doesn't respond.");
    };

    await expect(createUser(user, failConnection)).rejects.toThrowError();
  });

  it("User emails can't start with character 'a'.", async() => {
    const userAEmail = {
      username: "test",
      email: "atest@mail.com"
    };
    await expect(createUser(userAEmail, iDontDoAnything)).rejects.toThrowError();
  });
});