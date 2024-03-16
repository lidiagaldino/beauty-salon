import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalPrismaRepository } from '../../@core/infra/db/prisma/repositories/professional.prisma-repository';
import { CreateProfessionalUsecase } from '../../@core/application/usecases/professional/create-professional.usecase';
import { DeleteProfessionalUsecase } from '../../@core/application/usecases/professional/delete-professional.usecase';
import { FindAllProfessionalUsecase } from '../../@core/application/usecases/professional/find-all-professional.usecase';
import { FindProfessionalByIdUsecase } from '../../@core/application/usecases/professional/find-professional-by-id.usecase';
import { UpdateProfessionalUsecase } from '../../@core/application/usecases/professional/update-professional.usecase';
import { ICategoryRepository } from '../../@core/domain/repositories/category.repository';
import { IProfessionalRepository } from '../../@core/domain/repositories/professional.repository';
import { CategoryPrismaRepository } from '../../@core/infra/db/prisma/repositories/category.prisma-repository';
import { professionalSchema } from '../../@core/infra/validation/yup/schemas/professional.schema';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';

describe('ProfessionalsController', () => {
  let controller: ProfessionalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalsController],
      providers: [
        {
          provide: ProfessionalPrismaRepository,
          useClass: ProfessionalPrismaRepository,
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
          provide: CreateProfessionalUsecase,
          useFactory: (
            professionalRepository: IProfessionalRepository,
            categoryRepository: ICategoryRepository,
            yupAdapter: YupAdapter,
          ) => {
            return new CreateProfessionalUsecase(
              professionalRepository,
              categoryRepository,
              yupAdapter,
              professionalSchema,
            );
          },
          inject: [
            ProfessionalPrismaRepository,
            CategoryPrismaRepository,
            YupAdapter,
          ],
        },
        {
          provide: UpdateProfessionalUsecase,
          useFactory: (
            professionalRepository: IProfessionalRepository,
            categoryRepository: ICategoryRepository,
            yupAdapter: YupAdapter,
          ) => {
            return new UpdateProfessionalUsecase(
              professionalRepository,
              categoryRepository,
              yupAdapter,
              professionalSchema,
            );
          },
          inject: [
            ProfessionalPrismaRepository,
            CategoryPrismaRepository,
            YupAdapter,
          ],
        },
        {
          provide: DeleteProfessionalUsecase,
          useFactory: (professionalRepository: IProfessionalRepository) => {
            return new DeleteProfessionalUsecase(professionalRepository);
          },
          inject: [ProfessionalPrismaRepository],
        },
        {
          provide: FindAllProfessionalUsecase,
          useFactory: (professionalRepository: IProfessionalRepository) => {
            return new FindAllProfessionalUsecase(professionalRepository);
          },
          inject: [ProfessionalPrismaRepository],
        },
        {
          provide: FindProfessionalByIdUsecase,
          useFactory: (professionalRepository: IProfessionalRepository) => {
            return new FindProfessionalByIdUsecase(professionalRepository);
          },
          inject: [ProfessionalPrismaRepository],
        },
      ],
    }).compile();

    controller = module.get<ProfessionalsController>(ProfessionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
