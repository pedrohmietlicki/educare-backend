import { HttpException } from '@nestjs/common';

export class UserException extends HttpException {}

export class UserExists extends UserException {
  constructor() {
    super('Já existe um usuário com esse email', 400);
  }
}
export class UserNotFound extends UserException {
  constructor() {
    super('Usuário não encontrado', 404);
  }
}
