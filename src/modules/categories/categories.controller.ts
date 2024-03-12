import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TInputCategoryDTO } from '../../@core/application/dto/category.dto';
import { CreateCategoryUsecase } from '../../@core/application/usecases/category/create-category.usecase';
import { UpdateCategoryUsecase } from '../../@core/application/usecases/category/update-category.usecase';
import { FindAllCategoryUsecase } from '../../@core/application/usecases/category/find-all-category.usecase';
import { FindCategoryByIdUsecase } from '../../@core/application/usecases/category/find-category-by-id.usecase';
import { DeleteCategoryUsecase } from '../../@core/application/usecases/category/delete-category.usecase';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createUsecase: CreateCategoryUsecase,
    private readonly updateUsecase: UpdateCategoryUsecase,
    private readonly findAllUsecase: FindAllCategoryUsecase,
    private readonly findByIdUsecase: FindCategoryByIdUsecase,
    private readonly deleteUsecase: DeleteCategoryUsecase,
  ) {}

  @Post()
  create(@Body() dto: TInputCategoryDTO) {
    return this.createUsecase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUsecase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findByIdUsecase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: TInputCategoryDTO) {
    return this.updateUsecase.execute(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
