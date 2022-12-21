import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Team } from "../team";
import { User } from "../user";

@Table({
  tableName: "project",
})

export class Project extends Model<Project> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  })
    id_project!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    description!: string;

  @Column({
    type: DataType.ENUM,
    values: ["active", "pending", "completed", "deleted"],
    allowNull: false,
  })
    status!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    id_owner!: number;

  @BelongsTo(() => User)
    user!: User;
  
  @HasOne(() => Team)
    team!: Team;
}