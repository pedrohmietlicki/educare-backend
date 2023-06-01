import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/user.dto';
import CreateUser from 'src/usecases/create-user';

@ApiTags('User')
@Controller('user')
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
