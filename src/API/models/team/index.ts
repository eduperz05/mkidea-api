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
    allowNull: false,
    primaryKey: true,
  })
    id_team!: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    id_project!: number;
    
  @BelongsTo(() => Project)
    project!: Project;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    id_users!: number;
    
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    role!: number;

  @BelongsTo(() => User)
    users!: User[];
}
