import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Project } from "../project";
@Table({
  tableName: "user",
})

export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  })
    id_user!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
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
    validate: {
      len: {
        args: [8, 20],
        msg: "Password must be between 8 and 20 characters",
      },
      notEmpty: {
        msg: "Password cannot be empty",
      },
      notNull: {
        msg: "A password is required",
      },
    }
  })
    password!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  })
    role!: number;

  @HasMany(() => Project)
    projects!: Project[];
}