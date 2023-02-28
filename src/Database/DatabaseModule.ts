import { DynamicModule } from "@nestjs/common";

export interface DatabaseModule {
    connect: (url: string, options: any | null) => DynamicModule
}