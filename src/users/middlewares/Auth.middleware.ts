import { NestMiddleware,Injectable } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { UsersService } from "../users.service";
import {Request, Response, NextFunction} from 'express';
import { verify } from "jsonwebtoken";



export interface ExpressRequest extends Request{
  user?:User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware{
  constructor(private userService: UsersService){}
  use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null
      next()
      return
    }
    const token = req.headers['authorization'].split(' ')[1];
    try{
      const decode = verify(token, 'JWT_TOKEN') as {userName:string};
      const user =  this.userService.findByUserName(decode.userName);
      return user;
    } catch(err){
      req.user = null;
      next()
    }
    }
}