import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import {Model} from 'mongoose';
import { createUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUser.Dto';
import {compare} from 'bcrypt';
import { UserResponseType } from './user.response.entity';
import {sign} from 'jsonwebtoken';
@Injectable()
export class UsersService {
 constructor(@InjectModel(User.name) private userModel:Model<User>){}
 
  async createUser(createUserDto:createUserDto):Promise<any>{
    const user = await this.userModel.findOne({email:createUserDto.email});
    if(user){
      throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY)
     }
    const createUser = await new this.userModel(createUserDto);
    return createUser.save()
  }
  async login(loginUserDto:LoginUserDto){
   const user = await this.userModel.findOne({userName:loginUserDto.userName});
   if(!user){
    throw new HttpException('User  not found',HttpStatus.NOT_FOUND);
     }
    const comparePassword = compare(loginUserDto.password,user.password);
    if(!comparePassword){
      throw new HttpException('Password is incorrect',HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async findAll(){
    return this.userModel.find().exec();
  }
  async findByUserName(userName:string):Promise<User>{
   return this.userModel.findOne({userName});
  }
  async findOne(id:string){
    return this.userModel.findOne({_id:id}).exec()
  }
  async delete(id:string){
    const deletedUser = this.userModel
            .findByIdAndDelete({_id:id})
            .exec();
    if(!deletedUser) throw new Error('User not found');
    return deletedUser;
  }

   buildResponse(user:User):UserResponseType{
    return {
      userName:user.userName,
      email:user.email,
      token: this.generateToken(user),
    }
  }
  generateToken(user:User): string {
    return sign({email: user.email}, 'JWT_SECRET')
  }

}
