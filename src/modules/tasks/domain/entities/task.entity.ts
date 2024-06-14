export class TaskEntity {
  constructor(
    public title: string,
    public description: string,
    public status: string,
    public deadline: Date,
    public created_by: string,
    public comments?: string,
    public tags?: string,
    public file?: string,
  ) {}
}
