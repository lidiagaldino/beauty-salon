import { BadRequestException } from '../shared/errors/bad-request.exception';

export type TEmailProps = {
  email: string;
};

export class Email {
  private props: TEmailProps;

  private constructor(props: TEmailProps) {
    if (this.validate) this.props = props;
  }

  private validate(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(email)) return true;
    else throw new BadRequestException('INVALID_EMAIL');
  }

  get email(): string {
    return this.props.email;
  }
  set email(value: string) {
    this.props.email = value;
  }
  static create(props: TEmailProps): Email {
    return new Email(props);
  }

  public toString(): string {
    return JSON.stringify(this.props);
  }

  public toJSON(): TEmailProps {
    return this.props;
  }
}
