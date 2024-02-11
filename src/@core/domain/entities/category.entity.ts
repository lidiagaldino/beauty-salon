export type TCategoryProps = {
  name: string;
  description?: string;
};

export class Category {
  private id: number;
  private props: TCategoryProps;

  private constructor(props: TCategoryProps) {
    this.props = props;
  }

  public static create(props: TCategoryProps): Category {
    return new Category(props);
  }

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.props.name;
  }
  getDescription(): string {
    return this.props.description;
  }
  setId(value: number) {
    this.id = value;
  }
  setName(value: string) {
    this.props.name = value;
  }
  setDescription(value: string) {
    this.props.description = value;
  }

  public toString(): string {
    return JSON.stringify({ id: this.id, ...this.props });
  }
  public toJSON() {
    return { id: this.id, ...this.props };
  }
}
