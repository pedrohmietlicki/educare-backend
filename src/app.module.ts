import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseFactory } from './Database/DatabaseFactory';
import { MongoModule } from './Database/MongoModule';

@Module({
  imports: [DatabaseFactory.createDatabase(new MongoModule, 'mongodb://root:root@localhost:27017')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
