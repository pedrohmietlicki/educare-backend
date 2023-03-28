import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Teacher, { TeacherCreate } from 'src/entities/teacher';
import TeacherRepository from 'src/repositories/teacher.repository';
import { TeacherDocument, TeacherMongo } from '../definitions/teacher.scheema';

export default class TeacherRepositoryMongo implements TeacherRepository {
  constructor(
    @InjectModel(TeacherMongo.name)
    private teacherModel: Model<TeacherDocument>,
  ) {}
  async getTeacherById(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec();
    return teacher.toDomain();
  }
  async createTeacher(teacher: TeacherCreate): Promise<Teacher> {
    const teacherCreated = await this.teacherModel.create(teacher);
    return (await teacherCreated.save()).toDomain();
  }
}
