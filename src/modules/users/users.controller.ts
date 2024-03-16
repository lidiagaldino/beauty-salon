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
import { CreateUserUsecase } from '../../@core/application/usecases/user/create-user.usecase';
import { UpdateUserUsecase } from '../../@core/application/usecases/user/update-user.usecase';
import { DeleteUserUsecase } from '../../@core/application/usecases/user/delete-user.usecase';
import { FindUserByIdUseCase } from '../../@core/application/usecases/user/find-user-by-id.usecase';
import { FindAllUserUsecase } from '../../@core/application/usecases/user/find-all-user.usecase';
import {
  TInputUpdateUserDTO,
  TInputUserDTO,
} from '../../@core/application/dto/user.dto';
import { SignInUserUsecase } from '../../@core/application/usecases/user/sign-in-user.usecase';
import { TInputLogin } from '../../@core/application/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUsecase: CreateUserUsecase,
    private readonly updateUsecase: UpdateUserUsecase,
    private readonly deleteUsecase: DeleteUserUsecase,
    private readonly findByIdUsecase: FindUserByIdUseCase,
    private readonly findAllUsecase: FindAllUserUsecase,
    private readonly signInUsecase: SignInUserUsecase,
  ) {}

  @Post()
  create(@Body() dto: TInputUserDTO) {
    return this.createUsecase.execute(dto);
  }

  @Post('/login')
  signIn(@Body() dto: TInputLogin) {
    return this.signInUsecase.execute(dto);
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
  update(@Param('id') id: string, @Body() dto: TInputUpdateUserDTO) {
    return this.updateUsecase.execute(+id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.deleteUsecase.execute(+id);
  }
}
