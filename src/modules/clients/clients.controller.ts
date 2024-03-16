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
import { CreateClientUsecase } from '../../@core/application/usecases/client/create-client.usecase';
import { UpdateClientUsecase } from '../../@core/application/usecases/client/update-client.usecase';
import { DeleteClientUsecase } from '../../@core/application/usecases/client/delete-client.usecase';
import { FindAllClientUsecase } from '../../@core/application/usecases/client/find-all-client.usecase';
import { FindClientByIdUsecase } from '../../@core/application/usecases/client/find-client-by-id.usecase';
import {
  TInputClientDTO,
  TInputUpdateClientDTO,
} from '../../@core/application/dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createUsecase: CreateClientUsecase,
    private readonly updateUsecase: UpdateClientUsecase,
    private readonly deleteUsecase: DeleteClientUsecase,
    private readonly findByIdUsecase: FindClientByIdUsecase,
    private readonly findAllUsecase: FindAllClientUsecase,
  ) {}

  @Post()
  create(@Body() dto: TInputClientDTO) {
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
  update(@Param('id') id: string, @Body() dto: TInputUpdateClientDTO) {
    return this.updateUsecase.execute(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
