import { Body, Controller, Get, Param, Delete, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/CreateUserDto';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService:UsersService){}
  @Post()
   async createUser(@Body() creatUserDto: createUserDto){
    console.log(creatUserDto);
    return this.userService.createUser(creatUserDto)
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
