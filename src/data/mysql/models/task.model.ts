import { TaskStatusEnum } from '../../../modules/tasks/domain/enums';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity()
export class TaskModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.TO_DO,
  })
  status: string;

  @Column()
  deadline: Date;

  @Column()
  created_by: string;

  @Column()
  comments?: string;

  @Column()
  tags?: string;

  @Column()
  file?: string;

  @ManyToOne(() => UserModel, (user) => user.tasks)
  user: UserModel;
}
