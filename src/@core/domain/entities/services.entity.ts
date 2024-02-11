import { Category } from './category.entity';

export type TServiceProps = {
  id?: number;
  name: string;
  duration?: number;
  category: Category;
  price: number;
};

export class Service {
  private props: TServiceProps;
  private constructor(props: TServiceProps) {
    this.props = props;
  }
  public static create(props: TServiceProps): Service {
    return new Service(props);
  }
  get id(): number {
    return this.props.id;
  }
  get duration(): number {
    return this.props.duration;
  }
  get name(): string {
    return this.props.name;
  }
  get category(): Category {
    return this.props.category;
  }
  get price(): number {
    return this.props.price;
  }
  set id(value: number) {
    this.props.id = value;
  }
  set name(value: string) {
    this.props.name = value;
  }
  set category(value: Category) {
    this.props.category = value;
  }
  set price(value: number) {
    this.props.price = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TServiceProps {
    return this.props;
  }
}
