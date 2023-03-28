import { User } from './user';

export default class Teacher {
  id: string;
  user: User;
  subjects: string[];
  constructor({
    id,
    user,
    subjects,
  }: {
    id: string;
    user: User;
    subjects: string[];
  }) {
    this.id = id;
    this.user = user;
    this.subjects = subjects;
  }
}
export interface TeacherCreate {
  user: string;
  subjects: string;
}
