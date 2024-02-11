export type TStatusProps = {
  id?: number;
  name: string;
};

export class Status {
  private props: TStatusProps;

  private constructor(props: TStatusProps) {
    this.props = props;
  }

  public static create(props: TStatusProps): Status {
    return new Status(props);
  }

  get id(): number {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  set id(value: number) {
    this.props.id = value;
  }
  set name(value: string) {
    this.props.name = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TStatusProps {
    return this.props;
  }
}
