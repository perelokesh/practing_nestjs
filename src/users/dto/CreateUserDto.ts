import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createUserDto{
  @IsNotEmpty()
  @IsString()
  userName:string;

  @IsNotEmpty()
  @IsEmail()
  email:string;

  @IsString()
  @IsOptional()
  password:string;

}