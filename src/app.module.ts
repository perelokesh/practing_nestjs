import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseConfigService } from './db';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, 
    MongooseModule.forRoot(process.env.DB), 
    ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
