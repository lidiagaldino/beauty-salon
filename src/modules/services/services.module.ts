import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicePrismaRepository } from '../../@core/infra/db/prisma/repositories/service.prisma-repository';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';
import { CreateServiceUseCase } from '../../@core/application/usecases/services/create-service.usecase';
import { CategoryPrismaRepository } from '../../@core/infra/db/prisma/repositories/category.prisma-repository';
import { ICategoryRepository } from '../../@core/domain/repositories/category.repository';
import { IServiceRepository } from '../../@core/domain/repositories/service.repository';
import { serviceSchema } from '../../@core/infra/validation/yup/schemas/service.schema';
import { UpdateServiceUsecase } from '../../@core/application/usecases/services/update-service.usecase';
import { DeleteServiceUsecase } from '../../@core/application/usecases/services/delete-service.usecase';
import { FindAllServiceUsecase } from '../../@core/application/usecases/services/find-all-service.usecase';
import { FindServiceByIdUsecase } from '../../@core/application/usecases/services/find-service-by-id.usecase';

@Module({
  controllers: [ServicesController],
  providers: [
    {
      provide: ServicePrismaRepository,
      useClass: ServicePrismaRepository,
    },
    {
      provide: CategoryPrismaRepository,
      useClass: CategoryPrismaRepository,
    },
    {
      provide: YupAdapter,
      useClass: YupAdapter,
    },
    {
      provide: CreateServiceUseCase,
      useFactory: (
        serviceRepository: IServiceRepository,
        categoryRepository: ICategoryRepository,
        yupAdapter: YupAdapter,
      ) => {
        return new CreateServiceUseCase(
          serviceRepository,
          categoryRepository,
          yupAdapter,
          serviceSchema,
        );
      },
      inject: [ServicePrismaRepository, CategoryPrismaRepository, YupAdapter],
    },
    {
      provide: UpdateServiceUsecase,
      useFactory: (
        serviceRepository: IServiceRepository,
        categoryRepository: ICategoryRepository,
        yupAdapter: YupAdapter,
      ) => {
        return new UpdateServiceUsecase(
          serviceRepository,
          categoryRepository,
          yupAdapter,
          serviceSchema,
        );
      },
      inject: [ServicePrismaRepository, CategoryPrismaRepository, YupAdapter],
    },
    {
      provide: DeleteServiceUsecase,
      useFactory: (serviceRepository: IServiceRepository) => {
        return new DeleteServiceUsecase(serviceRepository);
      },
      inject: [ServicePrismaRepository],
    },
    {
      provide: FindAllServiceUsecase,
      useFactory: (serviceRepository: IServiceRepository) => {
        return new FindAllServiceUsecase(serviceRepository);
      },
      inject: [ServicePrismaRepository],
    },
    {
      provide: FindServiceByIdUsecase,
      useFactory: (serviceRepository: IServiceRepository) => {
        return new FindServiceByIdUsecase(serviceRepository);
      },
      inject: [ServicePrismaRepository],
    },
  ],
})
export class ServicesModule {}
