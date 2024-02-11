import { Client } from './client.entity';
import { Professional } from './professional.entity';
import { Service } from './services.entity';
import { Status } from './status.entity';

export type TSchedulingProps = {
  id?: number;
  service: Service;
  date: Date;
  status: Status;
  client: Client;
  professional?: Professional;
  discount?: number;
  total: number;
};

export class Scheduling {
  private props: TSchedulingProps;
  private constructor(props: TSchedulingProps) {
    this.props = props;
  }
  public static create(props: TSchedulingProps): Scheduling {
    return new Scheduling(props);
  }
  get id(): number {
    return this.props.id;
  }
  get service(): Service {
    return this.props.service;
  }
  get date(): Date {
    return this.props.date;
  }
  get status(): Status {
    return this.props.status;
  }
  get discount(): number {
    return this.props.discount;
  }
  get total(): number {
    return this.props.total;
  }
  set id(value: number) {
    this.props.id = value;
  }
  set service(value: Service) {
    this.props.service = value;
  }
  set date(value: Date) {
    this.props.date = value;
  }
  set status(value: Status) {
    this.props.status = value;
  }
  set discount(value: number) {
    this.props.discount = value;
  }
  set total(value: number) {
    this.props.total = value;
  }
  public toString(): string {
    return JSON.stringify(this.props);
  }
  public toJSON(): TSchedulingProps {
    return this.props;
  }
}
