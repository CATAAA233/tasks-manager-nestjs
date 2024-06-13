import { TaskStatusEnum } from '../../../domain/enums';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
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
}
