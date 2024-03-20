import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor (private readonly _envservice: ConfigService){}
  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    const uri = this._envservice.getOrThrow('DB');
    return {
       uri ,
       dbName:'NESTJS_Practice'
    }
  }
}