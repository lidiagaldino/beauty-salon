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
import { CreateSchedulingUsecase } from '../../@core/application/usecases/scheduling/create-scheduling.usecase';
import { UpdateSchedulingUsecase } from '../../@core/application/usecases/scheduling/update-scheduling.usecase';
import { DeleteSchedulingUsecase } from '../../@core/application/usecases/scheduling/delete-scheduling.usecase';
import { FindAllSchedulingUsecase } from '../../@core/application/usecases/scheduling/find-all-scheduling.usecase';
import { FindSchedulingByClient } from '../../@core/application/usecases/scheduling/find-scheduling-by-client.usecase';
import { FindSchedulingByIdUsecase } from '../../@core/application/usecases/scheduling/find-scheduling-by-id.usecase';
import { FindSchedulingByProfessional } from '../../@core/application/usecases/scheduling/find-scheduling-by-professional.usecase';
import { TInputSchedulingDTO } from '../../@core/application/dto/scheduling.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly createUsecase: CreateSchedulingUsecase,
    private readonly updateUsecase: UpdateSchedulingUsecase,
    private readonly deleteUsecase: DeleteSchedulingUsecase,
    private readonly findAllUsecase: FindAllSchedulingUsecase,
    private readonly findByIdUsecase: FindSchedulingByIdUsecase,
    private readonly findByClientUsecase: FindSchedulingByClient,
    private readonly findByProfessionalUsecase: FindSchedulingByProfessional,
  ) {}

  @Post()
  create(@Body() dto: TInputSchedulingDTO) {
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

  @Get('client/:id')
  findByClient(@Param('id') id: string) {
    return this.findByClientUsecase.execute(+id);
  }

  @Get('professional/:id')
  findByProfessional(@Param('id') id: string) {
    return this.findByProfessionalUsecase.execute(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: TInputSchedulingDTO) {
    return this.updateUsecase.execute(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
