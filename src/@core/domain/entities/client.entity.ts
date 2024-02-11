import { Email } from '../value-objects/email.value-object';
import { Phone } from '../value-objects/phone.value-object';

export type TClientProps = {
  id?: number;
  name: string;
  phone: Phone;
  login: Email;
  password?: string;
};

export class Client {
  private props: TClientProps;

  private constructor(props: TClientProps) {
    this.props = props;
  }

  public static create(props: TClientProps): Client {
    return new Client(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }
  get phone(): Phone {
    return this.props.phone;
  }
  get login(): Email {
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
  set phone(value: Phone) {
    this.props.phone = value;
  }
  set login(value: Email) {
    this.props.login = value;
  }
  set password(value: string) {
    this.props.password = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TClientProps {
    return this.props;
  }
}
