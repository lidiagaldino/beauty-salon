export type TUserProps = {
  name: string;
  login: string;
  password?: string;
};

export class User {
  private id: number;
  private props: TUserProps;

  private constructor(props: TUserProps) {
    this.props = props;
  }

  public static create(props: TUserProps): User {
    return new User(props);
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.props.name;
  }
  getLogin(): string {
    return this.props.login;
  }
  getPassword(): string {
    return this.props.password;
  }
  setId(value: number) {
    this.id = value;
  }
  setName(value: string) {
    this.props.name = value;
  }
  setLogin(value: string) {
    this.props.login = value;
  }
  setPassword(value: string) {
    this.props.password = value;
  }
  public toString(): string {
    return JSON.stringify({ id: this.id, ...this.props });
  }
  public toJSON() {
    return { id: this.id, ...this.props };
  }

  public toJSONWithoutPassword() {
    return {
      id: this.id,
      name: this.props.name,
      login: this.props.login,
    };
  }
}
