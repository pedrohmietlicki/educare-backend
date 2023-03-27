import Student, { StudentCreate } from 'src/entities/student';

export default interface StudentRepository {
  getStudentById(id: string): Promise<Student>;
  createStudent(student: StudentCreate): Promise<Student>;
}
