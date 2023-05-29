import { InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import { Model as SequelizeModel } from 'sequelize-typescript';

export abstract class Model<M extends SequelizeModel> extends SequelizeModel<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {}

export { CreationOptional, Attributes, CreationAttributes } from 'sequelize';
export { Column, AllowNull, PrimaryKey, Unique, CreatedAt, UpdatedAt, DataType, Table } from 'sequelize-typescript';
export { Optional, SequelizeModel, InferAttributes, InferCreationAttributes };
