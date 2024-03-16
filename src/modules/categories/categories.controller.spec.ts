import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUsecase } from '../../@core/application/usecases/category/create-category.usecase';
import { DeleteCategoryUsecase } from '../../@core/application/usecases/category/delete-category.usecase';
import { FindAllCategoryUsecase } from '../../@core/application/usecases/category/find-all-category.usecase';
import { FindCategoryByIdUsecase } from '../../@core/application/usecases/category/find-category-by-id.usecase';
import { UpdateCategoryUsecase } from '../../@core/application/usecases/category/update-category.usecase';
import { ICategoryRepository } from '../../@core/domain/repositories/category.repository';
import { CategoryPrismaRepository } from '../../@core/infra/db/prisma/repositories/category.prisma-repository';
import { IValidation } from '../../@core/domain/interfaces/validation.interface';
import { categorySchema } from '../../@core/infra/validation/yup/schemas/category.schema';
import { YupAdapter } from '../../@core/infra/validation/yup/yup.adapter';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoryPrismaRepository,
          useClass: CategoryPrismaRepository,
        },
        {
          provide: YupAdapter,
          useClass: YupAdapter,
        },
        {
          provide: CreateCategoryUsecase,
          useFactory: (
            categoryRepository: ICategoryRepository,
            validator: IValidation,
          ) =>
            new CreateCategoryUsecase(
              categoryRepository,
              validator,
              categorySchema,
            ),
          inject: [CategoryPrismaRepository, YupAdapter],
        },
        {
          provide: UpdateCategoryUsecase,
          useFactory: (
            categoryRepository: ICategoryRepository,
            validator: IValidation,
          ) =>
            new UpdateCategoryUsecase(
              categoryRepository,
              validator,
              categorySchema,
            ),
          inject: [CategoryPrismaRepository, YupAdapter],
        },
        {
          provide: DeleteCategoryUsecase,
          useFactory: (categoryRepository: ICategoryRepository) =>
            new DeleteCategoryUsecase(categoryRepository),
          inject: [CategoryPrismaRepository],
        },
        {
          provide: FindAllCategoryUsecase,
          useFactory: (categoryRepository: ICategoryRepository) =>
            new FindAllCategoryUsecase(categoryRepository),
          inject: [CategoryPrismaRepository],
        },
        {
          provide: FindCategoryByIdUsecase,
          useFactory: (categoryRepository: ICategoryRepository) =>
            new FindCategoryByIdUsecase(categoryRepository),
          inject: [CategoryPrismaRepository],
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
