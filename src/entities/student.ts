import { User } from './user';

export default class Student {
  id: string;
  user: User;
  constructor({ id, user }: { id: string; user: User }) {
    this.id = id;
    this.user = user;
  }
}

export interface StudentCreate {
  user: string;
}
