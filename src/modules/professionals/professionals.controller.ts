import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProfessionalUsecase } from '../../@core/application/usecases/professional/create-professional.usecase';
import { UpdateProfessionalUsecase } from '../../@core/application/usecases/professional/update-professional.usecase';
import { DeleteProfessionalUsecase } from '../../@core/application/usecases/professional/delete-professional.usecase';
import { FindAllProfessionalUsecase } from '../../@core/application/usecases/professional/find-all-professional.usecase';
import { FindProfessionalByIdUsecase } from '../../@core/application/usecases/professional/find-professional-by-id.usecase';
import { TInputProfessionalDTO } from '../../@core/application/dto/professional.dto';

@Controller('professionals')
export class ProfessionalsController {
  constructor(
    private readonly createUsecase: CreateProfessionalUsecase,
    private readonly updateUsecase: UpdateProfessionalUsecase,
    private readonly findAllUsecase: FindAllProfessionalUsecase,
    private readonly findByIdUsecase: FindProfessionalByIdUsecase,
    private readonly deleteUsecase: DeleteProfessionalUsecase,
  ) {}

  @Post()
  create(@Body() dto: TInputProfessionalDTO) {
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
  update(@Param('id') id: string, @Body() dto: TInputProfessionalDTO) {
    return this.updateUsecase.execute(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
