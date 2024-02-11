import { Category } from './category.entity';

export type TServiceProps = {
  name: string;
  duration?: number;
  category: Category;
  price: number;
};

export class Service {
  private id: number;
  private props: TServiceProps;
  private constructor(props: TServiceProps) {
    this.props = props;
  }
  public static create(props: TServiceProps): Service {
    return new Service(props);
  }
  getId(): number {
    return this.id;
  }
  getDuration(): number {
    return this.props.duration;
  }
  getName(): string {
    return this.props.name;
  }
  getCategory(): Category {
    return this.props.category;
  }
  getPrice(): number {
    return this.props.price;
  }
  setId(value: number) {
    this.id = value;
  }
  setName(value: string) {
    this.props.name = value;
  }
  setCategory(value: Category) {
    this.props.category = value;
  }
  setPrice(value: number) {
    this.props.price = value;
  }
  public toString(): string {
    return JSON.stringify({ id: this.id, ...this.props });
  }
  public toJSON() {
    return { id: this.id, ...this.props };
  }
}
