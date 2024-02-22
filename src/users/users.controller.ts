import { Body, Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/CreateUserDto';
import { User } from 'src/schemas/user.schema';
import { ApiBasicAuth } from '@nestjs/swagger';
import { UserResponseType } from './user.response.entity';
import { LoginUserDto } from './dto/LoginUser.Dto';

@ApiBasicAuth('Basic')
@Controller('users')
export class UsersController {
  constructor(private userService:UsersService){}
  @Post('signin')
   async createUser(@Body() creatUserDto: createUserDto):Promise<UserResponseType>{
    const user= await this.userService.createUser(creatUserDto)
    return this.userService.buildResponse(user);
  }
  
  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto):Promise<UserResponseType>{
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildResponse(user);
  }

  @Get()
  async findAll(): Promise<User[]>{
  return this.userService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id')id:string): Promise<User>{
    return this.userService.findOne(id);
  }
  
  @Delete(':id')
  async delete(@Param('id')id:string):Promise<User>{
    return this.userService.delete(id);
  }
}
