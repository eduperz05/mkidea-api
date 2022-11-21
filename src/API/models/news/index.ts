import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../user";
@Table({
    tableName:"news"
})

export class News extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  }) 
    id_new!: number;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
    id_user!: number;
  
  @BelongsTo(() => User)
    user!: User;

  @Column({
    type:DataType.STRING,
    allowNull: false
  })
   title!:string;
 
  @Column({
    type:DataType.TEXT,
    allowNull: false
  })
   description!: string;

  @Column({
    type:DataType.STRING,
    allowNull: false,
    validate:{
      isUrl: true
    }
  })
   url!: string;
}