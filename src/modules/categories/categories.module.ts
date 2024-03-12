import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoryPrismaRepository } from '../../@core/infra/db/prisma/repositories/category.prisma-repository';
import { CreateCategoryUsecase } from '../../@core/application/usecases/category/create-category.usecase';
import { ICategoryRepository } from '../../@core/domain/repositories/category.repository';
import { UpdateCategoryUsecase } from '../../@core/application/usecases/category/update-category.usecase';
import { DeleteCategoryUsecase } from '../../@core/application/usecases/category/delete-category.usecase';
import { FindAllCategoryUsecase } from '../../@core/application/usecases/category/find-all-category.usecase';
import { FindCategoryByIdUsecase } from '../../@core/application/usecases/category/find-category-by-id.usecase';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: CategoryPrismaRepository,
      useClass: CategoryPrismaRepository,
    },
    {
      provide: CreateCategoryUsecase,
      useFactory: (categoryRepository: ICategoryRepository) =>
        new CreateCategoryUsecase(categoryRepository),
      inject: [CategoryPrismaRepository],
    },
    {
      provide: UpdateCategoryUsecase,
      useFactory: (categoryRepository: ICategoryRepository) =>
        new UpdateCategoryUsecase(categoryRepository),
      inject: [CategoryPrismaRepository],
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
})
export class CategoriesModule {}
