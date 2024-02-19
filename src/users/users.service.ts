import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import {Model} from 'mongoose';
import { createUserDto } from './dto/CreateUserDto';
@Injectable()
export class UsersService {
 constructor(@InjectModel(User.name) private userModel:Model<User>){}
 
  async createUser(createUserDto:createUserDto){
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  async findAll(){
    return this.userModel.find().exec();
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
}
