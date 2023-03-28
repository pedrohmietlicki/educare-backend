import Teacher, { TeacherCreate } from 'src/entities/teacher';

export default interface TeacherRepository {
  getTeacherById(id: string): Promise<Teacher>;
  createTeacher(teacher: TeacherCreate): Promise<Teacher>;
}
