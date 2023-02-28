import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "./DatabaseModule";


MongooseModule.forRoot('mongodb')

export class DatabaseFactory {
    static createDatabase(db :DatabaseModule, url: string, options?: any ){
        return db.connect(url,options);
    }
}