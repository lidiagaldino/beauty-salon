import { Email } from '../value-objects/email.value-object';
import { Phone } from '../value-objects/phone.value-object';
import { Category } from './category.entity';

export type TProfessionalProps = {
  id?: number;
  name: string;
  phone: Phone;
  email: Email;
  categories: Category[];
};

export class Professional {
  private props: TProfessionalProps;

  private constructor(props: TProfessionalProps) {
    this.props = props;
  }

  public static create(props: TProfessionalProps): Professional {
    return new Professional(props);
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
  get categories(): Category[] {
    return this.props.categories;
  }
  get email(): Email {
    return this.props.email;
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
  set email(value: Email) {
    this.props.email = value;
  }
  set categories(value: Category[]) {
    this.props.categories = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TProfessionalProps {
    return this.props;
  }
}
