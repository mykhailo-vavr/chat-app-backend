import { Model } from '@/types';
import { CreationOptional } from 'sequelize';
import { Table, PrimaryKey, Column, DataType, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';

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

export { Message };
