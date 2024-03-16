import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { CreateClientUsecase } from '../../@core/application/usecases/client/create-client.usecase';
import { DeleteClientUsecase } from '../../@core/application/usecases/client/delete-client.usecase';
import { FindAllClientUsecase } from '../../@core/application/usecases/client/find-all-client.usecase';
import { FindClientByIdUsecase } from '../../@core/application/usecases/client/find-client-by-id.usecase';
import { UpdateClientUsecase } from '../../@core/application/usecases/client/update-client.usecase';
import { IPasswordCryptography } from '../../@core/domain/interfaces/password.criptography.interface';
import { IValidation } from '../../@core/domain/interfaces/validation.interface';
import { IClientRepository } from '../../@core/domain/repositories/client.repository';
import { BcryptAdapter } from '../../@core/infra/cryptography/password/bcrypt.adapter';
import { JwtAdapter } from '../../@core/infra/cryptography/user/jwt.adapter';
import { ClientPrismaRepository } from '../../@core/infra/db/prisma/repositories/client.prisma-repository';
import {
  clienteSchema,
  updateClientSchema,
} from '../../@core/infra/validation/yup/schemas/cliente.schema';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';

describe('ClientsController', () => {
  let controller: ClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientPrismaRepository,
          useClass: ClientPrismaRepository,
        },
        {
          provide: YupAdapter,
          useClass: YupAdapter,
        },
        {
          provide: JwtAdapter,
          useFactory: () => {
            return new JwtAdapter(process.env.SECRET, process.env.EXPIRES_IN);
          },
        },
        {
          provide: BcryptAdapter,
          useFactory: () => {
            return new BcryptAdapter(Number(process.env.SALT));
          },
        },
        {
          provide: CreateClientUsecase,
          useFactory: (
            clientRepository: IClientRepository,
            passwordCryptography: IPasswordCryptography,
            validator: IValidation,
          ) => {
            return new CreateClientUsecase(
              clientRepository,
              passwordCryptography,
              validator,
              clienteSchema,
            );
          },
          inject: [ClientPrismaRepository, BcryptAdapter, YupAdapter],
        },
        {
          provide: UpdateClientUsecase,
          useFactory: (
            clientRepository: IClientRepository,
            validator: IValidation,
          ) => {
            return new UpdateClientUsecase(
              clientRepository,
              validator,
              updateClientSchema,
            );
          },
          inject: [ClientPrismaRepository, YupAdapter],
        },
        {
          provide: DeleteClientUsecase,
          useFactory: (clientRepository: IClientRepository) => {
            return new DeleteClientUsecase(clientRepository);
          },
          inject: [ClientPrismaRepository],
        },
        {
          provide: FindAllClientUsecase,
          useFactory: (clientRepository: IClientRepository) => {
            return new FindAllClientUsecase(clientRepository);
          },
          inject: [ClientPrismaRepository],
        },
        {
          provide: FindClientByIdUsecase,
          useFactory: (clientRepository: IClientRepository) => {
            return new FindClientByIdUsecase(clientRepository);
          },
          inject: [ClientPrismaRepository],
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
