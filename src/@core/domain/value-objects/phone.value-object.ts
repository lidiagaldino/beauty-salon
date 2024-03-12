export type TPhoneProps = {
  number: string;
  ddi: string;
  ddd: string;
};

export class Phone {
  private props: TPhoneProps;

  private constructor(props: TPhoneProps) {
    this.props = props;
  }

  public static create(props: TPhoneProps): Phone {
    return new Phone(props);
  }
  public static createFromString(phone: string): Phone {
    const [ddd, ddi, number] = phone.split('');
    return Phone.create({
      ddd: ddd,
      ddi: ddi,
      number: number,
    });
  }

  get number(): string {
    return this.props.number;
  }
  get ddi(): string {
    return this.props.ddi;
  }
  get ddd(): string {
    return this.props.ddd;
  }
  set number(value: string) {
    this.props.number = value;
  }
  set ddi(value: string) {
    this.props.ddi = value;
  }
  set ddd(value: string) {
    this.props.ddd = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }

  public toStringFormat(): string {
    return `+${this.ddi} (${this.ddd}) ${this.number}`;
  }
  public toJSON(): TPhoneProps {
    return this.props;
  }
}
