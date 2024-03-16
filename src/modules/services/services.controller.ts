import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CreateServiceUseCase } from '../../@core/application/usecases/services/create-service.usecase';
import { UpdateServiceUsecase } from '../../@core/application/usecases/services/update-service.usecase';
import { DeleteServiceUsecase } from '../../@core/application/usecases/services/delete-service.usecase';
import { FindAllServiceUsecase } from '../../@core/application/usecases/services/find-all-service.usecase';
import { FindServiceByIdUsecase } from '../../@core/application/usecases/services/find-service-by-id.usecase';
import { TInputServicesDTO } from '../../@core/application/dto/services.dto';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly createUsecase: CreateServiceUseCase,
    private readonly updateUsecase: UpdateServiceUsecase,
    private readonly deleteUsecase: DeleteServiceUsecase,
    private readonly findAllUsecase: FindAllServiceUsecase,
    private readonly findByIdUsecase: FindServiceByIdUsecase,
  ) {}

  @Post()
  create(@Body() dto: TInputServicesDTO) {
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
  update(@Param('id') id: string, @Body() dto: TInputServicesDTO) {
    return this.updateUsecase.execute(dto, +id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
