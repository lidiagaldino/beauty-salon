export type TPhoneProps = {
  number: number;
  ddi: number;
  ddd: number;
};

export class Phone {
  private props: TPhoneProps;

  private constructor(props: TPhoneProps) {
    this.props = props;
  }

  public static create(props: TPhoneProps): Phone {
    return new Phone(props);
  }

  get number(): number {
    return this.props.number;
  }
  get ddi(): number {
    return this.props.ddi;
  }
  get ddd(): number {
    return this.props.ddd;
  }
  set number(value: number) {
    this.props.number = value;
  }
  set ddi(value: number) {
    this.props.ddi = value;
  }
  set ddd(value: number) {
    this.props.ddd = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TPhoneProps {
    return this.props;
  }
}
