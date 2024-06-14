import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskModel } from './task.model';

@Entity()
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @OneToMany(() => TaskModel, (task) => task.user)
  tasks: TaskModel[];
}
