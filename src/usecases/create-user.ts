import { UserCreate } from 'src/models/user.model';
import UserRepository from 'src/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserExists } from '../errors/user.error';
const SALT_ROUNDS = 10;
export default class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async perform({ email, password, name }: UserCreate) {
    if (await this.checkIfExists(email)) throw new UserExists();

    const criptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return await this.userRepository.createUser({
      email,
      name,
      password: criptedPassword,
    });
  }
  private async checkIfExists(email: string): Promise<boolean> {
    return (await this.userRepository.getUserByEmail(email)) != null;
  }
}
