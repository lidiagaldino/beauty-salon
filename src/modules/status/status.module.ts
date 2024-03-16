import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusPrismaRepository } from '../../@core/infra/db/prisma/repositories/status.prisma-repository';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';
import { CreateStatusUsecase } from '../../@core/application/usecases/status/create-status.usecase';
import { statusSchema } from '../../@core/infra/validation/yup/schemas/status.schema';
import { UpdateStatusUsecase } from '../../@core/application/usecases/status/update-status.usecase';
import { DeleteStatusUsecase } from '../../@core/application/usecases/status/delete-status.usecase';
import { FindAllStatusUsecase } from '../../@core/application/usecases/status/find-all-status.usecase';
import { FindStatusByIdUsecase } from '../../@core/application/usecases/status/find-status-by-id.usecase';

@Module({
  controllers: [StatusController],
  providers: [
    {
      provide: StatusPrismaRepository,
      useClass: StatusPrismaRepository,
    },
    {
      provide: YupAdapter,
      useClass: YupAdapter,
    },
    {
      provide: CreateStatusUsecase,
      useFactory: (
        statusPrismaRepository: StatusPrismaRepository,
        yupAdapter: YupAdapter,
      ) => {
        return new CreateStatusUsecase(
          statusPrismaRepository,
          yupAdapter,
          statusSchema,
        );
      },
      inject: [StatusPrismaRepository, YupAdapter],
    },
    {
      provide: UpdateStatusUsecase,
      useFactory: (
        statusPrismaRepository: StatusPrismaRepository,
        yupAdapter: YupAdapter,
      ) => {
        return new UpdateStatusUsecase(
          statusPrismaRepository,
          yupAdapter,
          statusSchema,
        );
      },
      inject: [StatusPrismaRepository, YupAdapter],
    },
    {
      provide: DeleteStatusUsecase,
      useFactory: (statusPrismaRepository: StatusPrismaRepository) => {
        return new DeleteStatusUsecase(statusPrismaRepository);
      },
      inject: [StatusPrismaRepository],
    },
    {
      provide: FindAllStatusUsecase,
      useFactory: (statusPrismaRepository: StatusPrismaRepository) => {
        return new FindAllStatusUsecase(statusPrismaRepository);
      },
      inject: [StatusPrismaRepository],
    },
    {
      provide: FindStatusByIdUsecase,
      useFactory: (statusPrismaRepository: StatusPrismaRepository) => {
        return new FindStatusByIdUsecase(statusPrismaRepository);
      },
      inject: [StatusPrismaRepository],
    },
  ],
})
export class StatusModule {}
