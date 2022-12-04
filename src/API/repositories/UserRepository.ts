import { User } from "../models/user";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByPk(id: number): Promise<User|null>;
  findByUser(value: string): Promise<User|null>;
  findByEmail(value: string): Promise<User|null>;
  create(user: any): Promise<User>;
  destroy(id: number): Promise<void>;
  update(id: number, user: any): Promise<User|null>;
  usernameExists(username: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
}
export class UserRepositorySequelize implements UserRepository {
  
  public async findAll(): Promise<User[]> {
    return User.findAll();
  }
  
  public async findByPk(id_user: number): Promise<User|null> {
    return User.findByPk(id_user);
  }
  
  public async findByUser(value: string): Promise<User|null> {
    return User.findOne({ where: { username: value } });
  }

  public async findByEmail(value: string): Promise<User|null> {
    return User.findOne({ where: { email: value } });
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
    if (sameEmail.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}