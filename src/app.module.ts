import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, 
    MongooseModule.forRoot('mongodb+srv://lokesh:connect@cluster0.jan7vci.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],
})
export class AppModule {
}
