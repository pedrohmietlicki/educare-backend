import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../../dto/user.dto';
import CreateUser from '../../../usecases/create-user';
import { UserHttpException } from '../filters/user-http-exception.filter';

@ApiTags('User')
@Controller('user')
@UseFilters(UserHttpException)
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuario' })
  @ApiCreatedResponse({ status: 201 })
  @ApiBadRequestResponse({ status: 400 })
  async create(@Body() userToCreate: CreateUserDto) {
    return await this.createUser.perform(userToCreate);
  }
}
