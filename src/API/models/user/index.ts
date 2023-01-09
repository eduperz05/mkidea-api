import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { News } from "../news";
import { Project } from "../project";
import { Team } from "../team";
@Table({
  tableName: "user",
})

export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
    id_user!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    firstname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    lastname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    password!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    role!: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    about!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    phone!: string;
    
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
    avatar!: string;

  @HasMany(() => Project)
    projects!: Project[];
  
  @HasMany(() => News)
    news!: News[];

  @HasMany(() => Team)
    team!: Team[];  
}