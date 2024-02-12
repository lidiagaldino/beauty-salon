import { Email } from '../value-objects/email.value-object';
import { Phone } from '../value-objects/phone.value-object';
import { Category } from './category.entity';

export type TProfessionalProps = {
  name: string;
  phone: Phone;
  email: Email;
  categories: Category[];
  bio: string;
};

export class Professional {
  private id: number;
  private props: TProfessionalProps;

  private constructor(props: TProfessionalProps) {
    this.props = props;
  }

  public static create(props: TProfessionalProps): Professional {
    return new Professional(props);
  }

  getId(): number {
    return this.id;
  }

  getBio(): string {
    return this.props.bio;
  }

  getName(): string {
    return this.props.name;
  }
  getPhone(): Phone {
    return this.props.phone;
  }
  getCategories(): Category[] {
    return this.props.categories;
  }
  getEmail(): Email {
    return this.props.email;
  }
  setId(value: number) {
    this.id = value;
  }
  setBio(value: string) {
    this.props.bio = value;
  }
  setName(value: string) {
    this.props.name = value;
  }

  setPhone(value: Phone) {
    this.props.phone = value;
  }
  setEmail(value: Email) {
    this.props.email = value;
  }
  setCategories(value: Category[]) {
    this.props.categories = value;
  }
  public toString(): string {
    return JSON.stringify({ id: this.id, ...this.props });
  }
  public toJSON() {
    return { id: this.id, ...this.props };
  }
}
