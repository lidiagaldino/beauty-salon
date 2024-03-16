import { Client } from './client.entity';
import { Professional } from './professional.entity';
import { Service } from './services.entity';
import { Status } from './status.entity';

export type TSchedulingProps = {
  service: Service;
  date: Date;
  status: Status;
  client: Client;
  professional: Professional;
  discount?: number;
  total?: number;
};

export class Scheduling {
  private id: number;
  private props: TSchedulingProps;
  private constructor(props: TSchedulingProps) {
    this.props = props;
  }
  public static create(props: TSchedulingProps): Scheduling {
    let discount = 0;
    let total = props.service.getPrice();
    if (props.discount) {
      discount = props.discount;
      total = total - discount;
    }
    props.total = total;
    return new Scheduling(props);
  }
  getId(): number {
    return this.id;
  }
  getService(): Service {
    return this.props.service;
  }
  getDate(): Date {
    return this.props.date;
  }
  getStatus(): Status {
    return this.props.status;
  }
  getProfessional(): Professional {
    return this.props.professional;
  }

  getClient(): Client {
    return this.props.client;
  }
  getDiscount(): number {
    return this.props.discount;
  }
  getTotal(): number {
    return this.props.total;
  }
  setId(value: number) {
    this.id = value;
  }
  setService(value: Service) {
    this.props.service = value;
  }
  setDate(value: Date) {
    this.props.date = value;
  }
  setStatus(value: Status) {
    this.props.status = value;
  }
  setDiscount(value: number) {
    this.props.discount = value;
  }
  setProfessional(value: Professional) {
    this.props.professional = value;
  }

  setClient(value: Client) {
    this.props.client = value;
  }

  calculateTotal() {
    return this.props.service.getPrice() - this.props.discount;
  }

  public toString(): string {
    return JSON.stringify({ id: this.id, ...this.props });
  }
  public toJSON() {
    return { id: this.id, ...this.props };
  }
}
