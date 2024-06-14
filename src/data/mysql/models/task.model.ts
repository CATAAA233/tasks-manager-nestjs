import { TaskStatusEnum } from '../../../modules/tasks/domain/enums';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity('tasks')
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

  @Column({ nullable: true })
  comments?: string;

  @Column({ nullable: true })
  tags?: string;

  @Column({ nullable: true })
  file?: string;

  @ManyToOne(() => UserModel, (user) => user.tasks)
  created_by: UserModel;
}
