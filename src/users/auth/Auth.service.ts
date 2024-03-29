import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users.service"

@Injectable()
export class AuthService{
  constructor (private userService:UsersService){}
   async signIn(username:string, pass:string):Promise<any>{
    const user = await this.userService.findOne(username);
    if(user?.password !== pass){
      // throw new Error(`User ${username} not found`);
      throw new UnauthorizedException;
    }
    const {password, ...result } = user;


    return user;

}


}