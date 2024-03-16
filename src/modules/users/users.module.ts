import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserPrismaRepository } from '../../@core/infra/db/prisma/repositories/user.prisma-repository';
import { CreateUserUsecase } from '../../@core/application/usecases/user/create-user.usecase';
import { IPasswordCryptography } from '../../@core/domain/interfaces/password.criptography.interface';
import { IValidation } from '../../@core/domain/interfaces/validation.interface';
import { IUserRepository } from '../../@core/domain/repositories/user.repository';
import { BcryptAdapter } from '../../@core/infra/cryptography/password/bcrypt.adapter';
import { JwtAdapter } from '../../@core/infra/cryptography/user/jwt.adapter';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';
import {
  updateUserSchema,
  userSchema,
} from '../../@core/infra/validation/yup/schemas/user.schema';
import { UpdateUserUsecase } from '../../@core/application/usecases/user/update-user.usecase';
import { DeleteUserUsecase } from '../../@core/application/usecases/user/delete-user.usecase';
import { FindAllUserUsecase } from '../../@core/application/usecases/user/find-all-user.usecase';
import { FindUserByIdUseCase } from '../../@core/application/usecases/user/find-user-by-id.usecase';
import { SignInUserUsecase } from '../../@core/application/usecases/user/sign-in-user.usecase';
import { IUserCryptography } from '../../@core/domain/interfaces/user-cryptography.interface';
import { loginSchema } from '../../@core/infra/validation/yup/schemas/login.schema';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: UserPrismaRepository,
      useClass: UserPrismaRepository,
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
      provide: CreateUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        passwordCryptography: IPasswordCryptography,
        validator: IValidation,
      ) => {
        return new CreateUserUsecase(
          userRepository,
          passwordCryptography,
          validator,
          userSchema,
        );
      },
      inject: [UserPrismaRepository, BcryptAdapter, YupAdapter],
    },

    {
      provide: UpdateUserUsecase,
      useFactory: (userRepository: IUserRepository, validator: IValidation) => {
        return new UpdateUserUsecase(
          userRepository,
          validator,
          updateUserSchema,
        );
      },
      inject: [UserPrismaRepository, YupAdapter],
    },

    {
      provide: DeleteUserUsecase,
      useFactory: (userRepository: IUserRepository) => {
        return new DeleteUserUsecase(userRepository);
      },
      inject: [UserPrismaRepository],
    },

    {
      provide: FindAllUserUsecase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindAllUserUsecase(userRepository);
      },
      inject: [UserPrismaRepository],
    },

    {
      provide: FindUserByIdUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new FindUserByIdUseCase(userRepository);
      },
      inject: [UserPrismaRepository],
    },
    {
      provide: SignInUserUsecase,
      useFactory: (
        userRepository: IUserRepository,
        userCriptography: IUserCryptography,
        passwordCryptography: IPasswordCryptography,
        validator: IValidation,
      ) => {
        return new SignInUserUsecase(
          userRepository,
          userCriptography,
          passwordCryptography,
          validator,
          loginSchema,
        );
      },
      inject: [UserPrismaRepository, JwtAdapter, BcryptAdapter, YupAdapter],
    },
  ],
})
export class UsersModule {}
