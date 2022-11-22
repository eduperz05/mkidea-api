import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Project } from "../project";
import { User } from "../user";

@Table({
  tableName: "team",
})

export class Team extends Model<Team> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  })
  id_team!: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_project!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_users!: number;

  @BelongsTo(() => User)
    users!: User[];
}
