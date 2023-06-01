import sequelize from '@/sequelize';
import { Model, Table, PrimaryKey, Column, DataType, AllowNull, CreatedAt, UpdatedAt, CreationOptional } from '@/types';

@Table({ modelName: 'Message', tableName: 'messages' })
class Message extends Model<Message> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id!: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  senderId!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  recipientId!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  message!: string;

  @CreatedAt
  createdAt!: CreationOptional<Date>;

  @UpdatedAt
  updatedAt!: CreationOptional<Date>;
}

sequelize.addModels([Message]);

export { Message };
