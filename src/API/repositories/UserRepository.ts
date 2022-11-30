import { User } from "../models/user";

export class UserRepository {
  
  public async findAll(): Promise<User[]> {
    return User.findAll();
  }
  
  public async findByPk(id_user: number): Promise<User|null> {
    return User.findByPk(id_user);
  }
  
  public async create(userToCreate: any): Promise<User> {
    return User.create(userToCreate);
  }
  
  public async destroy(id_user: number): Promise<void> {
    User.destroy({ where: { id_user } });
  }

  public async update(id_user: number, userToUpdate: any): Promise<User|null> {
    await User.update({ ...userToUpdate }, { where: { id_user } });
    return User.findByPk(id_user);
  }

  public async usernameExists(userToCreate: any): Promise<boolean> {
    const username = userToCreate.username;
    const sameUsername = await User.findAll({ where: { username: username } });
    if (sameUsername.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public async emailExists(userToCreate: any): Promise<boolean> {
    const email = userToCreate.email;
    const sameEmail = await User.findAll({ where: { email: email } });
    if (sameEmail.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}