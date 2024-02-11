export type TCategoryProps = {
  id?: number;
  name: string;
  description?: string;
};

export class Category {
  private props: TCategoryProps;

  private constructor(props: TCategoryProps) {
    this.props = props;
  }

  public static create(props: TCategoryProps): Category {
    return new Category(props);
  }

  get id(): number {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  set id(value: number) {
    this.props.id = value;
  }
  set name(value: string) {
    this.props.name = value;
  }
  set description(value: string) {
    this.props.description = value;
  }

  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TCategoryProps {
    return this.props;
  }
}
