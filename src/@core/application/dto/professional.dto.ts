import { TEmailProps } from '../../domain/value-objects/email.value-object';
import { TPhoneProps } from '../../domain/value-objects/phone.value-object';

export type TInputProfessionalDTO = {
  name: string;
  phone: TPhoneProps;
  email: TEmailProps;
  categories_id: number[];
  bio: string;
};

export type TOutputProfessionalDTO = {
  id: number;
  name: string;
  phone: TPhoneProps;
  email: TEmailProps;
  categories_id: number[];
  bio: string;
};
