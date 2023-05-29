import sequelize from '@/sequelize';
import {
  Model,
  Table,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  CreationOptional,
} from '@/types';

@Table({ modelName: 'User', tableName: 'users' })
class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id!: CreationOptional<number>;

  @AllowNull(false)
  @Column({ type: DataType.STRING(20) })
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  lastName!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(20))
  phone!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(100))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password!: string;

  @CreatedAt
  createdAt!: CreationOptional<Date>;

  @UpdatedAt
  updatedAt!: CreationOptional<Date>;
}

sequelize.addModels([User]);

export default User;
