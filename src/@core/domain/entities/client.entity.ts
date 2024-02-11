import { Email } from '../value-objects/email.value-object';
import { Phone } from '../value-objects/phone.value-object';

export type TClientProps = {
  name: string;
  phone: Phone;
  login: Email;
  password?: string;
};

export class Client {
  private id: number;
  private props: TClientProps;

  private constructor(props: TClientProps) {
    this.props = props;
  }

  public static create(props: TClientProps): Client {
    return new Client(props);
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.props.name;
  }
  getPhone(): Phone {
    return this.props.phone;
  }
  getLogin(): Email {
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
  setPhone(value: Phone) {
    this.props.phone = value;
  }
  setLogin(value: Email) {
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
}
