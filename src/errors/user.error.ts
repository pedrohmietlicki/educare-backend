export class UserException extends Error {}

export class UserExists extends UserException {
  constructor() {
    super('Já existe um usuário com esse email');
  }
}
export class UserNotFound extends UserException {
  constructor() {
    super('Usuário não encontrado');
  }
}
