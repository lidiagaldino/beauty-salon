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
import { CreateStatusUsecase } from '../../@core/application/usecases/status/create-status.usecase';
import { UpdateStatusUsecase } from '../../@core/application/usecases/status/update-status.usecase';
import { DeleteStatusUsecase } from '../../@core/application/usecases/status/delete-status.usecase';
import { FindStatusByIdUsecase } from '../../@core/application/usecases/status/find-status-by-id.usecase';
import { FindAllStatusUsecase } from '../../@core/application/usecases/status/find-all-status.usecase';
import { TInputStatusDTO } from '../../@core/application/dto/status.dto';

@Controller('status')
export class StatusController {
  constructor(
    private readonly createUsecase: CreateStatusUsecase,
    private readonly updateUsecase: UpdateStatusUsecase,
    private readonly deleteUsecase: DeleteStatusUsecase,
    private readonly findByIdUsecase: FindStatusByIdUsecase,
    private readonly findAllUsecase: FindAllStatusUsecase,
  ) {}

  @Post()
  create(@Body() dto: TInputStatusDTO) {
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
  update(@Param('id') id: string, @Body() dto: TInputStatusDTO) {
    return this.updateUsecase.execute(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
