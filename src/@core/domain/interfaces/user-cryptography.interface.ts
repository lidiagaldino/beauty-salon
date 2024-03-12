import { IUserPayload } from './user-payload.interface';

export interface IUserCryptography {
  verify(value: string): IUserPayload;
  encrypt(object: IUserPayload): string;
  isClient(value: string): boolean;
  isAdmin(value: string): boolean;
}
