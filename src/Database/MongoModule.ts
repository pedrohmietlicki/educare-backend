import { DynamicModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseModule } from "./DatabaseModule";

export class MongoModule implements DatabaseModule{
    connect(url: string, options: any) {
        return MongooseModule.forRoot(url);
    }
    
}