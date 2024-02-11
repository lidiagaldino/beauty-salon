import { TEmailProps } from '../../domain/value-objects/email.value-object';
import { TPhoneProps } from '../../domain/value-objects/phone.value-object';

export type TInputClientDTO = {
  name: string;
  phone: TPhoneProps;
  login: TEmailProps;
  password: string;
};

export type TOutputClientDTO = {
  id: number;
  name: string;
  phone: TPhoneProps;
  login: TEmailProps;
};
