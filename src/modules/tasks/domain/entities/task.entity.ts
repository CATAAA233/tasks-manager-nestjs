import { CommentEntity } from './comment.entity.';

interface Props {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: Date;
  created_by: string;
  comments?: CommentEntity[];
  tags?: string;
  file?: string;
}
export class TaskEntity {
  public id: string;
  public title: string;
  public description: string;
  public status: string;
  public deadline: Date;
  public created_by: string;
  public comments?: CommentEntity[];
  public tags?: string;
  public file?: string;

  constructor(props: Props) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.deadline = props.deadline;
    this.created_by = props.created_by;
    this.comments = props.comments;
    this.tags = props.tags;
    this.file = props.file;
  }
}
