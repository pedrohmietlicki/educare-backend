import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Student, { StudentCreate } from 'src/entities/student';
import StudentRepository from 'src/repositories/student.repository';
import { StudentDocument, StudentMongo } from '../definitions/student.scheema';

export default class StudentRepositoryMongo implements StudentRepository {
  constructor(
    @InjectModel(StudentMongo.name)
    private studentModel: Model<StudentDocument>,
  ) {}
  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    return student.toDomain();
  }
  async createStudent(student: StudentCreate): Promise<Student> {
    const studentCreated = await this.studentModel.create(student);
    return (await studentCreated.save()).toDomain();
  }
}
