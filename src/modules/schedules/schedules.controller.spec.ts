import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { CreateSchedulingUsecase } from '../../@core/application/usecases/scheduling/create-scheduling.usecase';
import { DeleteSchedulingUsecase } from '../../@core/application/usecases/scheduling/delete-scheduling.usecase';
import { FindAllSchedulingUsecase } from '../../@core/application/usecases/scheduling/find-all-scheduling.usecase';
import { FindSchedulingByClient } from '../../@core/application/usecases/scheduling/find-scheduling-by-client.usecase';
import { FindSchedulingByIdUsecase } from '../../@core/application/usecases/scheduling/find-scheduling-by-id.usecase';
import { FindSchedulingByProfessional } from '../../@core/application/usecases/scheduling/find-scheduling-by-professional.usecase';
import { UpdateSchedulingUsecase } from '../../@core/application/usecases/scheduling/update-scheduling.usecase';
import { IValidation } from '../../@core/domain/interfaces/validation.interface';
import { IClientRepository } from '../../@core/domain/repositories/client.repository';
import { IProfessionalRepository } from '../../@core/domain/repositories/professional.repository';
import { ISchedulingRepository } from '../../@core/domain/repositories/scheduling.repository';
import { IServiceRepository } from '../../@core/domain/repositories/service.repository';
import { IStatusRepository } from '../../@core/domain/repositories/status.repository';
import { ClientPrismaRepository } from '../../@core/infra/db/prisma/repositories/client.prisma-repository';
import { ProfessionalPrismaRepository } from '../../@core/infra/db/prisma/repositories/professional.prisma-repository';
import { SchedulingPrismaRepository } from '../../@core/infra/db/prisma/repositories/scheduling.prisma-repository';
import { ServicePrismaRepository } from '../../@core/infra/db/prisma/repositories/service.prisma-repository';
import { StatusPrismaRepository } from '../../@core/infra/db/prisma/repositories/status.prisma-repository';
import { schedulingSchema } from '../../@core/infra/validation/yup/schemas/scheduling.schema';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';

describe('SchedulesController', () => {
  let controller: SchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [
        {
          provide: SchedulingPrismaRepository,
          useClass: SchedulingPrismaRepository,
        },
        {
          provide: ClientPrismaRepository,
          useClass: ClientPrismaRepository,
        },
        {
          provide: StatusPrismaRepository,
          useClass: StatusPrismaRepository,
        },
        {
          provide: ServicePrismaRepository,
          useClass: ServicePrismaRepository,
        },
        {
          provide: ProfessionalPrismaRepository,
          useClass: ProfessionalPrismaRepository,
        },
        {
          provide: YupAdapter,
          useClass: YupAdapter,
        },
        {
          provide: CreateSchedulingUsecase,
          useFactory: (
            schedulingRepository: ISchedulingRepository,
            statusRepository: IStatusRepository,
            serviceRepository: IServiceRepository,
            clientRepository: IClientRepository,
            professionalRepository: IProfessionalRepository,
            validator: IValidation,
          ) => {
            return new CreateSchedulingUsecase(
              schedulingRepository,
              statusRepository,
              serviceRepository,
              clientRepository,
              professionalRepository,
              validator,
              schedulingSchema,
            );
          },
          inject: [
            SchedulingPrismaRepository,
            StatusPrismaRepository,
            ServicePrismaRepository,
            ClientPrismaRepository,
            ProfessionalPrismaRepository,
            YupAdapter,
          ],
        },
        {
          provide: UpdateSchedulingUsecase,
          useFactory: (
            schedulingRepository: ISchedulingRepository,
            statusRepository: IStatusRepository,
            serviceRepository: IServiceRepository,
            clientRepository: IClientRepository,
            professionalRepository: IProfessionalRepository,
            validator: IValidation,
          ) => {
            return new UpdateSchedulingUsecase(
              schedulingRepository,
              statusRepository,
              serviceRepository,
              clientRepository,
              professionalRepository,
              validator,
              schedulingSchema,
            );
          },
          inject: [
            SchedulingPrismaRepository,
            StatusPrismaRepository,
            ServicePrismaRepository,
            ClientPrismaRepository,
            ProfessionalPrismaRepository,
            YupAdapter,
          ],
        },
        {
          provide: DeleteSchedulingUsecase,
          useFactory: (schedulingRepository: ISchedulingRepository) => {
            return new DeleteSchedulingUsecase(schedulingRepository);
          },
          inject: [SchedulingPrismaRepository],
        },
        {
          provide: FindAllSchedulingUsecase,
          useFactory: (schedulingRepository: ISchedulingRepository) => {
            return new FindAllSchedulingUsecase(schedulingRepository);
          },
          inject: [SchedulingPrismaRepository],
        },
        {
          provide: FindSchedulingByIdUsecase,
          useFactory: (schedulingRepository: ISchedulingRepository) => {
            return new FindSchedulingByIdUsecase(schedulingRepository);
          },
          inject: [SchedulingPrismaRepository],
        },
        {
          provide: FindSchedulingByClient,
          useFactory: (
            schedulingRepository: ISchedulingRepository,
            clientRepository: IClientRepository,
          ) => {
            return new FindSchedulingByClient(
              schedulingRepository,
              clientRepository,
            );
          },
          inject: [SchedulingPrismaRepository, ClientPrismaRepository],
        },
        {
          provide: FindSchedulingByProfessional,
          useFactory: (
            schedulingRepository: ISchedulingRepository,
            professionalRepository: IProfessionalRepository,
          ) => {
            return new FindSchedulingByProfessional(
              schedulingRepository,
              professionalRepository,
            );
          },
          inject: [SchedulingPrismaRepository, ProfessionalPrismaRepository],
        },
      ],
    }).compile();

    controller = module.get<SchedulesController>(SchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
