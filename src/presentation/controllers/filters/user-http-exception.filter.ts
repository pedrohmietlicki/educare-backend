import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  UserException,
  UserExists,
  UserNotFound,
} from '../../../errors/user.error';

@Catch(UserException)
export class UserHttpException implements ExceptionFilter {
  catch(exception: UserException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof UserNotFound)
      return response.status(404).send({
        error: exception.message || 'Sem Mensagem',
      });
    if (exception instanceof UserExists) {
      return response.status(400).send({
        error: exception.message || 'Sem Mensagem',
      });
    }

    return response.status(500).send({
      error: 'Erro Inesperado',
    });
  }
}
