interface Props {
  id: string;
  title: string;
}

export class TagsEntity {
  public id: string;
  public title: string;
  constructor(props: Props) {
    const { id, title } = props;
    this.id = id;
    this.title = title;
  }
}
