import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  deadline: string;

  @Column()
  created_by: string;

  @Column()
  comments?: string;

  @Column()
  tags?: string[];

  @Column()
  file?: string;
}
