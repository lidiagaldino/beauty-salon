export type TStatusProps = {
  name: string;
};

export class Status {
  private id: number;
  private props: TStatusProps;

  private constructor(props: TStatusProps) {
    this.props = props;
  }

  public static create(props: TStatusProps): Status {
    return new Status(props);
  }

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.props.name;
  }
  setId(value: number) {
    this.id = value;
  }
  setName(value: string) {
    this.props.name = value;
  }
  public toString(): string {
    return JSON.stringify({ id: this.id, ...this.props });
  }
  public toJSON() {
    return { id: this.id, ...this.props };
  }
}
