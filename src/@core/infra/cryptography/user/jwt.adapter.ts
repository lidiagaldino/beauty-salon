import { IUserCryptography } from '../../../domain/interfaces/user-cryptography.interface';
import { IUserPayload } from '../../../domain/interfaces/user-payload.interface';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements IUserCryptography {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}
  verify(value: string): IUserPayload {
    return jwt.verify(value, this.secret) as IUserPayload;
  }
  encrypt(object: IUserPayload): string {
    return jwt.sign(object, this.secret, { expiresIn: this.expiresIn });
  }
  isClient(value: string): boolean {
    return this.verify(value).type === 'CLIENT';
  }
  isAdmin(value: string): boolean {
    return this.verify(value).type === 'ADMIN';
  }
}
