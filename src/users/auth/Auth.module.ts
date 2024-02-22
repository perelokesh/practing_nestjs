import {  Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { UsersModule } from "../users.module";
import { AuthController } from "./Auth.controller";

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}