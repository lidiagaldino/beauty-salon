import { Exception } from './exception';

export class UnauthorizedError extends Exception {
  constructor() {
    super('UNAUTHORIZED', 401);
  }
}
