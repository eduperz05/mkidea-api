import { Table, Model, Column, DataType } from "sequelize-typescript";
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
  
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  id_user!: number;
  
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