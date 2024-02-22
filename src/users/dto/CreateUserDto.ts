import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class createUserDto{
  // @IsNotEmpty()
  // @IsString()
  @ApiProperty()
  userName:string;

  // @IsNotEmpty()
  // @IsEmail()
  @ApiProperty()
  email:string;

  @ApiProperty()
  password:string;

}