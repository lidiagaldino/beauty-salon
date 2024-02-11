export type TUserProps = {
  id?: number;
  name: string;
  login: string;
  password?: string;
};

export class User {
  private props: TUserProps;

  private constructor(props: TUserProps) {
    this.props = props;
  }

  public static create(props: TUserProps): User {
    return new User(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }
  get login(): string {
    return this.props.login;
  }
  get password(): string {
    return this.props.password;
  }
  set id(value: number) {
    this.props.id = value;
  }
  set name(value: string) {
    this.props.name = value;
  }
  set login(value: string) {
    this.props.login = value;
  }
  set password(value: string) {
    this.props.password = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TUserProps {
    return this.props;
  }
}
