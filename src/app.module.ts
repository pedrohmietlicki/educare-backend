import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './presentation/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017'),
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
