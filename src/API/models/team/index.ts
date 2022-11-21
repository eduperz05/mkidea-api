import { Table, Model, Column, DataType, ForeignKey, HasOne } from "sequelize-typescript";
import { Project } from "../project";
import { User } from "../user";

@Table({
  tableName: "team",
})

export class Team extends Model<Team> {
  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    primaryKey: true,
  })
  id_project!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    primaryKey: true,
  })
  id_user!: number;

  @HasOne(() => Project, { foreignKey: 'id_project' })
  project: any;
}
