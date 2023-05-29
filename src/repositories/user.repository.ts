import { User, UserCreate } from 'src/entities/user';

export interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  createUser(user: UserCreate): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}
