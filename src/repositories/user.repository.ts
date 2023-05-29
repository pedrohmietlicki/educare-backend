import { User } from 'src/entities/user';

export default interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  createUser(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}
