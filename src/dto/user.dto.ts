import { ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Esta item é obrigatório',
    example: 'Pedro Mietlicki',
  })
  name: string;
  @ApiProperty({
    type: String,
    example: 'senha',
  })
  password: string;
  @ApiProperty({
    type: String,
    example: 'pedromietlicke@gmail.com',
  })
  email: string;
}

export { CreateUserDto };
