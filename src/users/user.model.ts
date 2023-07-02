import { Model, Table, Column, HasMany } from 'sequelize-typescript';
import { Cat } from '../cats/cat.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @HasMany(() => Cat)
  cats: Cat[];
}
