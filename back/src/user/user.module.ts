import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { UserDataSchema } from './schemas/userData.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: "User",
        schema: UserSchema
      },
      { 
        name: "UserData",
        schema: UserDataSchema
      },  
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class AuthModule {}
