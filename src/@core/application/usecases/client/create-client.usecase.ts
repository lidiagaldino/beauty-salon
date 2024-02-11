import { Client } from '../../../domain/entities/client.entity';
import { IPasswordCryptography } from '../../../domain/interfaces/password.criptography.interface';
import { IClientRepository } from '../../../domain/repositories/client.repository';
import { Email } from '../../../domain/value-objects/email.value-object';
import { Phone } from '../../../domain/value-objects/phone.value-object';
import { TInputClientDTO, TOutputClientDTO } from '../../dto/client.dto';
import { mapOutput } from './util';

export class CreateClientUsecase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly passwordCryptography: IPasswordCryptography,
  ) {}

  async execute(input: TInputClientDTO): Promise<TOutputClientDTO> {
    const password = await this.passwordCryptography.hash(input.password);
    const phone = Phone.create(input.phone);
    const login = Email.create(input.login);
    const client = Client.create({ ...input, phone, login, password });
    const createdClient = await this.clientRepository.create(client);
    return mapOutput(createdClient);
  }
}
